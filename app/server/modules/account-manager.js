var crypto = require('crypto');
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;
var moment = require('moment');

var dbPort = 27017;
var dbHost = 'localhost';
var dbName = 'node-login';

/* establish a database connection */

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(error, database){
    if(error){
        console.log(error);
    }else{
        console.log('connected to database:: ' + dbName);
    }
});

var accounts = db.collection('accounts');

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
                    callback(output);
                }else{
                    callback("invalid-password");
                }
            });
        }
    });
}

/* record insertion, update and deletion methods */
exports.addNewAccount = function(newData, callback){
    accounts.findOne({user: newData.user}, function(error, output){
        output.name = newData.name;
        output.email = newData.email;
        output.country = newData.country;
        if(newData.pass = ''){
            accounts.save(output, {safe: true}, callback);
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
    var salt = hashedPass.subStr(0, 10);
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