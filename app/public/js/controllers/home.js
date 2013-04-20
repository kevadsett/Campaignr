Campaignr.Controllers.home = Content.extend({
    events: {
        'click .campaignItem a':'setCampaign'
    },
    init:function(){
        this.data = {campaigns: Campaignr.Campaigns.toJSON()};
    },
    setup: function () {
        console.log('setup');
        /*
        */
        console.log('homeController');
    },
    setCampaign: function () {
        console.log('setCampaign');
    }
});