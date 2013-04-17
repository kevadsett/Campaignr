var CampaignCollection = Backbone.Collection.extend({
    model: Campaign,
<<<<<<< HEAD:app/public/js/collections/collections.js
    url: '/db',
    initialize: function() {
        this.on('change', this.render, this);
    },
    render: function(){
        console.log(this);
    }
=======
    url: '/db'
>>>>>>> CampaignBuild:app/public/js/models/collections.js
})
var Planet = Backbone.Collection.extend({
    model: Territory,
    initialize: function() {
<<<<<<< HEAD:app/public/js/collections/collections.js
        //console.log('New Planet Collection Created');
=======
>>>>>>> CampaignBuild:app/public/js/models/collections.js
    }
});

var Players = Backbone.Collection.extend({
    model: Player,
    initialize: function() {
<<<<<<< HEAD:app/public/js/collections/collections.js
        //console.log('players');
=======
>>>>>>> CampaignBuild:app/public/js/models/collections.js
    }
});

var Battles = Backbone.Collection.extend({
    model: Battle,
    initialize: function() {
<<<<<<< HEAD:app/public/js/collections/collections.js
        //console.log('battles');
=======
>>>>>>> CampaignBuild:app/public/js/models/collections.js
    }
});

var Factions = Backbone.Collection.extend({
    model: Faction,
    initialize: function() {
<<<<<<< HEAD:app/public/js/collections/collections.js
        //console.log('factions');
=======
>>>>>>> CampaignBuild:app/public/js/models/collections.js
    }
})
