var CampaignCollection = Backbone.Collection.extend({
    model: Campaign,
    url: '/db',
    initialize: function() {
        //console.log('cmpans');
        this.on('change', this.render, this);
    },
    render: function(){
        console.log(this);
    }
})
var Campaigns = new CampaignCollection();

var Planet = Backbone.Collection.extend({
    model: Territory,
    initialize: function() {
    }
});

var Players = Backbone.Collection.extend({
    model: Player,
    initialize: function() {
    }
});

var Battles = Backbone.Collection.extend({
    model: Battle,
    initialize: function() {
    }
});

var Factions = Backbone.Collection.extend({
    model: Faction,
    initialize: function() {
    }
})

var App = Backbone.View.extend({
    initialize: function() {
        var self = this;
        Campaigns.fetch({success: function(){
            self.render();
        }});
        
        
    },
    render: function() {
        var mainTemplate = Handlebars.templates["main"];
        $('body').append(mainTemplate);
        var homeTemplate = Handlebars.templates["home"];
        var campaignData = {campaigns: Campaigns.toJSON()};
        var html = homeTemplate(campaignData);
        $('#content').append(html);
        var campaignBuilderTemplate = Handlebars.templates["newCampaign"];
        console.log(Campaigns);
        $('#campaignBuilder').append(campaignBuilderTemplate);
        this.trigger('appRendered');
    }
})