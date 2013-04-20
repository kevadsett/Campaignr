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
        if(!Campaignr.Controllers[route])
            return;
        this.routeTo(route);
    },
    routeTo: function (route) {
        if(Campaignr.View)
            Campaignr.View.stopListening();
        Campaignr.View = new Campaignr.Controllers[route];
    }
});