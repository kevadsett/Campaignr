var App = Backbone.View.extend({
    el: "body",
    initialize: function() {
        var self = this;
        Campaignr.Campaigns.fetch({success: function(){
            Campaignr.Router = new Router();
            Backbone.history.start();
            //Campaignr.Router.navigate('/home', {trigger: true})
        }});  
    },
    render: function() {
        var html = Handlebars.templates["main"];
        this.$el.html(html);
        //var campaignBuilderTemplate = Handlebars.templates["newCampaign"];
        //$('#campaignBuilder').append(campaignBuilderTemplate);
    }
})

var Content = Backbone.View.extend({
    el: "#content",
    initialize: function() {
        console.log('content view init');
        this.render();
    },
    render: function() {
        var template = Handlebars.templates[Campaignr.Location];
        var data = {campaigns: Campaignr.Campaigns.toJSON()};
        console.log(data);
        var html = template(data);
        this.$el.html(html);
        this.setup()
    },
    setup: function () {
        console.log('setup');
    }
});

var HomeController = Content.extend({
    setup: function () {
        console.log('homeController');
    }
});