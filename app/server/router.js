
var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');

module.exports = function(app) {

    //get campaign//
    app.get('/db', function(req, res){
        AM.getCampaigns(req.session.user.user, function(output){
            res.send(output);
        })
    })
    
    
    
    // main login page //

    app.get('/', function(req, res){
		console.log("get /");
        // check if users credentials are stored in a cookie
        if(req.cookies.user == undefined || req.cookies.pass == undefined){
            res.render('login', {title: 'Hello – Please Login To Your Account'});
        }else{
            // attempt automatic login
            AM.autoLogin(req.cookies.user, req.cookies.pass, function(output){
                if(output != null){
                    req.session.user = output;
                    res.redirect('/home');
                }else{
                    res.render('login', {title: 'Hello – Please Login To Your Account'});
                }
            });
        }
    });

    app.post('/', function(req, res){
		console.log("post /");
        AM.manualLogin(req.param('user'), req.param('pass'), function(error, output){
			console.log(error);
			console.log(output);
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

    app.get('/home', function(req, res){
		console.log("get /home");
        if(!req.session.user){
            // if user is not logged in, redirect them to login page
            res.redirect('/');
        }else{
            AM.getCampaigns(req.session.user.user, function(output){
                res.render('home', {
                    title : 'Your campaigns',
                    campaigns: output
                });
            });

        }
    });

    app.post('/home', function(req, res){
		console.log("post /home");
        if(req.param('user') != undefined){
            AM.updateAccount({
                user:       req.param('user'),
                name:       req.param('name'),
                email:      req.param('email'),
                country:    req.param('country'),
                pass:       req.param('pass'),
            }, function(error, output){
                if(error){
                    res.send('error-updating-account', 400);
                }else{
                    req.session.user = output;
                    // update the user's login cookies if they exist
                    if(req.cookies.user != undefined && req.cookies.pass != undefined){
                        res.cookie('user', output.user, { maxAge: 900000 });
                        res.cookie('pass', output.pass, { maxAge: 900000 });
                    }
                    res.send('ok', 200);
                }
            });
        }else if(req.param('logout') == 'true'){
            res.clearCookie('user');
            res.clearCookie('pass');
            req.session.destroy(function(error){ res.send('ok', 200) });
        }
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

   

    app.get('*', function(req, res) { res.render('404', {title: 'Page not found'}) });
};