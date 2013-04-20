var Campaignr = {
    Controllers: {}
};
var Router = Backbone.Router.extend({
    routes: {
        ":route":"routeCheck"
    },
    initialize: function () {
        Backbone.history.start();
        this.on('route', this.change);
        if(Backbone.history.fragment === "")
            this.navigate('#/home', {trigger: true});
    },
    routeCheck: function (route) {
        if(route === "")
            this.navigate('#/home', {trigger: true});
        if(Campaignr.Controllers[route])
            this.routeTo(route);
        if(Campaignr.Campaigns.findWhere({_id: route}) != null) {
            Campaignr.CurrentCampaign = Campaignr.Campaigns.findWhere({_id: route});
            this.navigate('#/edit', {trigger: true});
        }
    },
    routeTo: function (route) {
        if(Campaignr.View)
            Campaignr.View.stopListening();
        if(route === "edit" && !Campaignr.CurrentCampaign)
            this.navigate('#/home', {trigger: true});    
        Campaignr.Location = route;
        Campaignr.View = new Campaignr.Controllers[route];
    }
});