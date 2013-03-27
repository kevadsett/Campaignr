var CampaignCollection = Backbone.Collection.extend({
    model: Campaign,
    url: '/db',
    initialize: function() {
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
        //console.log('players');
    }
});

var Battles = Backbone.Collection.extend({
    model: Battle,
    initialize: function() {
        //console.log('battles');
    }
});

var Factions = Backbone.Collection.extend({
    model: Faction,
    initialize: function() {
        //console.log('factions');
    }
})