var Router = Backbone.Router.extend({
    routes: {
        "home":"home"
    },
    initialize: function() {
        Campaignr.App.render();
        this.navigate('/home', {trigger: true});
        this.on('route', this.change);
    },
    change: function(route) {
        Campaignr.Location = route;
    },
    home: function () {
        console.log('reached home');
        if(Campaignr.View)
            Campaignr.View.remove();
        Campaignr.View = new HomeController();
    }
});