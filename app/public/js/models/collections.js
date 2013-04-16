var CampaignCollection = Backbone.Collection.extend({
    model: Campaign,
    url: '/db'
})
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
