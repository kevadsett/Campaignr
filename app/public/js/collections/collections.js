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
        //console.log('New Planet Collection Created');
    }
});

var Players = Backbone.Collection.extend({
    model: Player,
    initialize: function() {
        //console.log('playas');
    }
});

var Battles = Backbone.Collection.extend({
    model: Battle,
    initialize: function() {
        //console.log('bttls');
    }
});

var Factions = Backbone.Collection.extend({
    model: Faction,
    initialize: function() {
        //console.log('fctns');
    }
})

var App = Backbone.View.extend({
    initialize: function() {
        var self = this;
        Campaigns.fetch({success: function(){
            //console.log(Campaigns.toJSON());
            self.render();
        }});
        
        
    },
    render: function() {
        var template = Handlebars.templates["main"];
        $('body').append(template);
        var template2 = Handlebars.templates["newCampaign"];
        console.log(Campaigns);
        var campaignData = {campaigns: Campaigns.toJSON()};
        console.log(campaignData);
        var html = template2({campaignURL: "campaign12345"});
        $('#content').append(html);
        this.trigger('appRendered');
    }
})