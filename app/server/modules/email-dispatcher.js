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
        attachment: EM.composeResetPassEmail(account)
    }, callback);
}

EM.composeResetPassEmail = function(userAccount){
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

EM.dispatchJoinCampaignLink = function(senderAccount, toEmail, secureEmail, campaignID, callback) {
    console.log("senderAccount.email: " + senderAccount.email + ", toEmail: " + toEmail + ", secureEmail: " + secureEmail + ", campaignID: " + campaignID)
    EM.server.send({
        from:       senderAccount.email,
        to:         toEmail,
        subject:    "Please join my campaign!",
        text:       "I'm not sure where this goes",
        attachment: EM.composeJoinCampaignEmail(campaignID, senderAccount, secureEmail)
    }, callback);
}

EM.composeJoinCampaignEmail = function(campaignIDToJoin, senderAccount, secureEmail){
    var link = 'http:/localhost:3000/joinCampaign?cid=' + campaignIDToJoin + '&e=' + secureEmail;
    var html = "<html><body>";
        html += "Hi, <br/><br/>";
        html += "Your buddy, <b>" + senderAccount.user + "</b>, wants you to join their campaign.<br/><br/>";
        html += "<a href='" + link + "'>Please click here to accept their invite.</a><br/><br/>";
        html += "Cheers,<br/>";
        html += "The Campaignr Team<br/><br/>";
        html += "</body></html>";
    return [{data: html, alternative:true}];
}