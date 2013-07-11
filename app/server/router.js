
var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');

module.exports = function(app) {

    //get campaign//
    app.get('/db', function(req, res){
        console.log("get /db");
        AM.getCampaigns(req.session.user.user, function(out){
            console.log("/db:      "+out);
            res.send(out);
        });
/*
        var campaignList = [];
        AM.getCampaignsOwnedByMe(req.session.user.user, function(output){
            console.log("campaigns owned by me: " + output);
            for(var i=0; i<output.length; i++){
                campaignList.push(output[i]);
            }
            AM.getCampaignsIPlayInButDontOwn(req.session.user.user, function(output){
                console.log("campaigns I play in but don't own: " + output);
                for(var j=0; i<output.length; j++){
                    campaignList.push(output[j]);
                }
                console.log(campaignList);
                res.send(campaignList);
            })
        })
*/
    })
    
    
    
    // main login page //

    app.get('/login', function(req, res){
		console.log("get /login");
        // check if users credentials are stored in a cookie
        if(req.cookies.user == undefined || req.cookies.pass == undefined){
            res.render('login', {title: 'Hello – Please Login To Your Account'});
        }else{
            // attempt automatic login
            AM.autoLogin(req.cookies.user, req.cookies.pass, function(output){
                if(output != null){
                    req.session.user = output;
                    res.redirect('/');
                }else{
                    res.render('login', {title: 'Hello – Please Login To Your Account'});
                }
            });
        }
    });

    app.post('/login', function(req, res){
		console.log("post /login");
        AM.manualLogin(req.param('user'), req.param('pass'), function(error, output){
			console.log("err:   "+error);
			console.log("out:   "+output);
            if(!output){
                res.send(error, 400);
            }else{
                req.session.user = output;
                if(req.param('remember-me') == 'true'){
                    res.cookie('user', output.user, { maxAge: 900000 });
                    res.cookie('pass', output.pass, { maxAge: 900000 });
                }
                res.send(output, 200);
            }
        });
    });

    // logged-in user homepage

    app.get('/', function(req, res){
		console.log("get /");
        if(!req.session.user){
            // if user is not logged in, redirect them to login page
            res.redirect('/login');
        }else{
            res.render('home', {
                title : 'Campaignr'
            });
        }
    });

    app.post('/logout', function(req, res){
		console.log("post /logout");
        if(req.param('logout') == 'true'){
            res.clearCookie('user');
            res.clearCookie('pass');
            req.session.destroy(function(error){ res.send('ok', 200) });
        }
    });
    app.post('/', function(req, res){
        console.log("post /");
        var campaign = {};
        var data = req.body;
        campaign.name = data.campaignName;
        campaign.owner = req.session.user.user;
        campaign.planets = [];
        for(var i=0; i<data.planetName.length; i++){
            var planetData = {};
            planetData.name = data.planetName[i];
            planetData.territories = [];
            for(var j=0; j<data.territories[i]; j++){
                var territoryData = {};
                territoryData.id = planetData.name + "_ter_" + j;
                planetData.territories.push(territoryData);
            }
            campaign.planets.push(planetData);
        }
        var campaignObject = {campaign: campaign};
        console.log(campaignObject);
        
        AM.addCampaign(campaignObject, function(data){
            console.log(data);
        });
        res.render('home', {
            title : 'Campaignr'
        });
    });
    // creating new accounts

    app.get('/signup', function(req, res){
		console.log("get /signup");
        res.render('signup', {title: 'Signup', countries: CT});
    });

    app.post('/signup', function(req, res){
		console.log("post /signup");
        AM.addNewAccount({
            name:       req.param('name'),
            email:      req.param('email'),
            user:       req.param('user'),
            pass:       req.param('pass'),
            country:    req.param('country')
        }, function(error){
            if(error){
                res.send(error, 400);
            }else{
                res.send('ok', 200);
            }
        });
    });

    // password reset

    app.post('/lost-password', function(req, res){
		console.log("post /lost-password");
        // look up the user's account via their email
        AM.getAccountByEmail(req.param('email'), function(output){
            if(output){
                res.send('ok', 200);
                EM.dispatchResetPasswordLink(output, function(error, message){
                    // this callback takes a moment to return
                    // should add an ajax Loader to give user feedback
                    if(!error) {
                    //    res.send('ok', 200);
                    }else{
                        res.send('email-server-error', 400);
                        for(k in error) console.log('error: ', k, error[k]);
                    }
                });
            }else{
                res.send('email-not-found', 400);
            }
        });
    });

    app.get('/reset-password', function(req, res){
		console.log("get /reset-password");
        var email = req.query["e"];
        var passH = req.query["p"];
        AM.validateResetLink(email, passH, function(response){
            if(response != 'ok'){
                res.redirect('/');
            }else{
                // save the user's email in the session instead of sending it to the client
                req.session.reset = {email:email, passHash:passH};
                res.render('reset', {title: 'Reset password'});
            }
        });
    });

    app.post('/reset-password', function(req, res){
		console.log("post /reset-password");
        var nPass = req.param('pass');
        // retrieve the user's email from the session to lookup their account and reset password
        var email = req.session.reset.email;
        // destroy the session immediately after retrieving the stored email
        req.session.destroy();
        AM.updatePassword(email, nPass, function(error, output){
            if(output){
                res.send('ok', 200);
            }else{
                res.send('unable to update password', 400);
            }
        });
    });
    
    app.post('/createCampaign', function(req, res){
        console.log("post /createCampaign");
        var newCampaign = req.body;
        newCampaign.owner = req.session.user.user;
        newCampaign.players[0].name = req.session.user.user;
        console.log(newCampaign);
        AM.addCampaign({campaign: newCampaign}, function(data, error){
            console.log(data);
            console.log(error);
        });
        res.render('home', {title: 'Campaignr'});
    });
    
    app.post('/inviteToCampaign', function(req, res){
        console.log("post /inviteToCampaign");
        var campaignID = req.param('campaignID');
        console.log("campaignID: " + campaignID);
        var senderEmail = req.session.user.email;
        console.log("senderEmail: " + senderEmail);
        var toEmails = req.param('toEmails');
        console.log(toEmails);
        for(var i=0; i<toEmails.length; i++) {
            EM.dispatchJoinCampaignLink(req.session.user, toEmails[i], campaignID, function(error, output){
                console.log(output);
                if(output) {
                    res.send('ok', 200);
                }else{
                    res.send('email-server-error', 400);
                    for(k in error) console.log('error: ', k, error[k]);
                }
            });
        }
            
    });
    
    app.get('/joinCampaign', function(req, res){
        console.log("get /joinCampaign");
        var campaignID = req.query["campaignID"];
        var invitedPlayerEmail = req.query["e"];
        console.log(campaignID);
        // toDO: write validatePlayerIsInvited function
        AM.validatePlayerIsInvited(invitedPlayerEmail, campaignID, function(playerInvited){
            res.render('home', {title: 'Campaignr'});
        });
    });

    app.get('*', function(req, res) { res.render('404', {title: 'Page not found'}) });
};