var App = Backbone.View.extend({
    el: "body",
    initialize: function() {
        var self = this;
        Campaignr.Campaigns.fetch({success: function(){
            Campaignr.Router = new Router();
        }});
        this.render();
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
        this.data = {};
        this.init();
        console.log('content view init');
        this.render();
    },
    render: function() {
        var template = Handlebars.templates[Campaignr.Location];
        console.log(this.data);
        var html = template(this.data);
        this.$el.html(html);
        this.setup()
    },
    setup: function () {
        console.log('setup');
    },
    init: function () {
    
    }
});