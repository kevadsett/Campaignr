var dbURI = 'mongodb://admin:adminpass@dharma.mongohq.com:10088/campaignr';
var collections = ["users"];
var crypto = require('crypto');
var MongoJS = require('mongojs');
var Server = require('mongodb').Server;
var moment = require('moment');

var dbPort = 10088;
var dbHost = 'dharma.mongohq.com';
var dbName = 'campaignr';

/* establish a database connection */

var db = MongoJS.connect(dbURI, collections);

var campaigns = db.collection('campaigns');
var accounts = db.collection('users');

/*get campaign data*/

exports.getCampaignsOwnedByMe = function(user, callback){
    campaigns.find({'campaign.owner':"ownerPlayerName"}, function(error, output){
        output!== null ? callback(output) : callback(null);
    });  
};

exports.getCampaignsIPlayInButDontOwn = function(user, callback){
    campaigns.find({'campaign.owner':{$ne: "ownerPlayerName"}, 'campaign.players.name':"ownerPlayerName"}, function(error, output){
        output!== null ? callback(output) : callback(null);
    });
};
exports.getCampaigns = function(user, callback){
    campaigns.find({"campaign.players.name" : user}, function(err, out){
        err ? callback(null) : callback(out);
    })
};
exports.addCampaign = function(campaignData, callback){
    campaigns.insert(campaignData, {safe: true}, callback)
};

/* login validation methods */

exports.autoLogin = function(user, pass, callback){
    accounts.findOne({user: user}, function(error, output){
        if(output){
            output.pass == pass ? callback(output) : callback(null);
        } else {
            callback(null);
        }
    });
}

exports.manualLogin = function(user, pass, callback){
    accounts.findOne({user: user}, function(error, output){
        if(output == null){
            callback("user-not-found");
        }else{
            validatePassword(pass, output.pass, function(err, res){
                if(res){
                    callback(null, output);
                }else{
                    callback("invalid-password");
                }
            });
        }
    });
}

/* record insertion, update and deletion methods */
exports.addNewAccount = function(newData, callback){
	console.log("///----addNewAccount----///")
	console.log(newData);
    accounts.findOne({user: newData.user}, function(error, output){
		if(output){
			callback('username-taken');
		}else{
			accounts.findOne({email: newData.email}, function(err, out){
				if(out){
					callback('email-taken');
				}else{
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
						// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						accounts.insert(newData, {safe: true}, callback);
					});
				}
            });
        }
    });
}

exports.updateAccount = function(newData, callback){
    accounts.findOne({user:newData.user}, function(error, output){
        output.name = newData.name;
        output.email = newData.email;
        output.country = newData.country;
        if(newData.pass = ''){
            accounts.save(output, {safe: true}, callback);
        }else{
            saltAndHash(newData.pass, function(hash){
                output.pass = hash;
                accounts.save(output, {safe:true}, callback);
            });
        }
    });
}

/* account lookup methods */

exports.deleteAccount = function(id, callback){
    accounts.remove({_id: getObjectID(id)}, callback);
}

exports.getAccountByEmail = function(email, callback){
    accounts.findOne({email: email}, function(error, output){ callback(output) });
}

exports.validateResetLink = function(email, passHash, callback){
    accounts.find({ $and: [{email:email, pass:passHash}]}, function(error, output){
        callback(output ? 'ok' : null);
    });
}

exports.getAllRecords = function(callback){
    accounts.find().toArray(function(error, response){
        if(error) callback(error);
        else callback(null, response);
    });
}

exports.delAllRecords = function(callback){
    accounts.remove({}, callback); // reset accounts collection for testing
}

exports.validatePlayerIsInvited = function(user, campaignID, callback){
    console.log(user);
    console.log(campaignID);
    callback(false);
}

var generateSalt = function(){
    var set = '123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for(var i = 0; i < 10; i++){
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function(str){
    return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback){
    var salt = generateSalt();
    callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback){
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    callback(null, hashedPass === validHash);
}

/* auxiliary methods */
var getObjectId = function(id){
    return accounts.db.bson_serializer.ObjectID.createFromHexString(id);
}

var findById = function(id, callback){
    accounts.findOne({_id: getObjectId(id)}, function(error, response){
        if(error) callback(error);
        else callback(null, response);
    });
}

var findByMultipleFields = function(arrayOfFields, callback){
    // this takes an array of name/value pairs to search against {fieldset: 'value'}
    accounts.find({$or: a}).toArray(function(error, results){
        if(error) callback(error);
        else callback(null, results);
    });
}
