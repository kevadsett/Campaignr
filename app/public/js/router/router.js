var Router = Backbone.Router.extend({
    routes: {
        "home":"home",
        "create":"create"
    },
    initialize: function() {
        Campaignr.App.render();
        this.navigate('/home', {trigger: true});
        this.on('route', this.change);
    },
    change: function(route) {
        console.log('change');
        Campaignr.Location = route;
    },
    home: function () {
        console.log('reached home');
        if(Campaignr.View)
            Campaignr.View.remove();
        Campaignr.View = new HomeController();
    },
    create: function() {
        console.log('reached create');
        Campaignr.Location = "create";
        if(Campaignr.View)
            Campaignr.View.remove();
        Campaignr.View = new CreateController();
    }
});