var Router = Backbone.Router.extend({
    routes: {
        "home":"home",
        "create":"create",
        "edit":"edit"
    },
    initialize: function() {
        Backbone.history.start();
        this.on('route', this.change);
        this.navigate('/home', {trigger: true});
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
    },
    edit: function() {
        console.log('reached edit');
        Campaignr.Location = "edit";
        if(Campaignr.View)
            Campaignr.View.remove();
        Campaignr.View = new EditController();
    }
});