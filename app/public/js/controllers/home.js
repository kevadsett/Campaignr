Campaignr.Controllers.home = Content.extend({
    init:function(){
        this.data = {campaigns: Campaignr.Campaigns.toJSON()};
    },
    setup: function () {
        console.log('setup');
        /*
        */
        console.log('homeController');
    }
});