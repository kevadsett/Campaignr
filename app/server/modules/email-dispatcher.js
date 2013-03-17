var ES = require('./email-settings');
var EM = {};
module.exports = EM;

EM.server = require('emailjs/email').server.connect({
    host:       ES.host,
    user:       ES.user,
    password:   ES.password,
    ssl:        true
});

EM.dispatchResetPasswordLink = function(account, callback){
    EM.server.send({
        from:   ES.sender,
        to:     account.email,
        subject:    'Password reset',
        text:       'Something went wrong... :(',
        attachment: EM.composeEmail(account)
    }, callback);
}

EM.composeEmail = function(userAccount){
    var link = 'http://campaign-map.herokuapp.com/reset-password?e=' + userAccount.email + '&p=' + userAccount.pass;
    var html = "<html><body>";
        html += "Hi " + userAccount.name + ", <br/><br/>";
        html += "Your username is:: <b>" + userAccount.user + "</b><br/><br/>";
        html += "<a href='" + link + "'>Please click here to reset your password</a><br/><br/>";
        html += "Cheers,<br/>";
        html += "<a href='http://www.twitter.com/kevatron400'>Kevatron400</a><br/><br/>";
        html += "</body></html>";
    return [{data: html, alternative:true}];
}