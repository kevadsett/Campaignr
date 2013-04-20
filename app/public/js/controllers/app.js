var Campaignr = {
    Campaigns: new CampaignCollection(),
    CurrentCampaign: null,
    App: null,
    Router: null,
    View: null,
    Location: 'home'
};
$(function() {
    Campaignr.App = new App();
});