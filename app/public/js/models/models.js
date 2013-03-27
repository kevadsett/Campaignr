var App = Backbone.View.extend({
    initialize: function(){
        console.log('app');
        Campaigns.fetch();
    }
})

var Campaign = Backbone.Model.extend({
    initialize: function() {
        console.log("new campaign");
        console.log(this.toJSON());
    },
    parse: function(resp){
        var d = resp.campaign;
        var Planets = _.reduce(d.planets, function(planets, planet){
            var p = new Planet(planet.territories);
            p.collectionAttr("name", planet.name);
            planets.push(p);
            return planets;
        }, []);
        resp = {
            _id:resp._id,
            name: d.name,
            owner: d.owner,
            players: new Players(d.players),
            battles: new Battles(d.battles),
            factions: new Factions(d.factions),
            planets:Planets
        }
        console.log(resp);
        return resp;
    },
    clone:function(){
        
    
    }
});

var Player = Backbone.Model.extend({
    defaults: {
        name: "UnsetPlayerName",
        points: 0,
        notes: []
    },
    initialize: function(){
        console.log("New Player model created");
    }
});

var Battle = Backbone.Model.extend({
    initialize: function() {
        console.log("new battle");
    }

});

var Faction = Backbone.Model.extend({
    defaults: {
        name: 'UnsetFactionName',
        points: 0
    },
    initialize: function(){
        console.log('new faction');
    }
});

var Territory = Backbone.Model.extend({
    initialize: function() {
        console.log("New Territory Model Created");
    },
    defaults: {
        type: "Default Type",
        owner: "Default Owner",
        notes: "blank for now"
    }
});
