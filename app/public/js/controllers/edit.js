Campaignr.Controllers.edit = Content.extend({
    init: function () {
        console.log('edit');
        this.data = Campaignr.CurrentCampaign.toJSON();
    },
    setup: function () {
        $('#sendInviteBtn').on('click', this.sendInvite);
        /*
        _.each(Campaignr.CurrentCampaign.get('planets'), function(planet){
            new editPlanetController({collection: planet});
        });*/
    }, 
    sendInvite: function(event){
        console.log(Campaignr.CurrentCampaign);
        $.post("inviteToCampaign", {campaignID: Campaignr.CurrentCampaign.get('_id'), toEmails: $('#inviteEmail').val().split(',')}, function(data){
            console.log(data);
        });
    }
});