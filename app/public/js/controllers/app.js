var Campaignr = {
    Campaigns: new CampaignCollection(),
    App: null,
    Router: null,
    View: null,
    Location: 'home'
};
$(function() {
    Campaignr.App = new App();
    //Campaignr.Router = new Router();
    //Backbone.history.start();
});