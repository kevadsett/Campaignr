<<<<<<< HEAD
var App = Backbone.View.extend({
    initialize: function(){
       
        console.log('app');
        Campaigns.fetch({success:function(){
            Campaigns.trigger('loaded');
        }});
    },
    onCampaignLoaded:function(){
        console.log("stuff is happening");
    }
})

var Campaign = Backbone.Model.extend({
    initialize: function() {
        console.log("new campaign");
        //console.log(this.toJSON());
=======


var Campaign = Backbone.Model.extend({
    initialize: function() {
        //console.log("new campaign");
>>>>>>> CampaignBuild
    },
    parse: function(resp){
        var d = resp.campaign;
        var Planets = _.reduce(d.planets, function(planets, planet){
            var p = new Planet(planet.territories);
            p.collectionAttr("name", planet.name);
            p.collectionAttr("notes", planet.notes);
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
        //console.log(resp);
        return resp;
    },
    toJSON:function(){
        var Planets = _.reduce(this.planets, function(planets, planet){
            alert('planets');
            var p = {
                name: planet.collectionAttr("name"),
                notes: planet.collectionAttr("notes"),
                territories: planet.models.toJSON()
            }
            planets.push(p);
            console.log(planets);
            return planets;
        }, [])
        var resp = {
            _id: this.get('_id'),
            campaign: {
                name: this.get('name'),
                battles: this.get('battles').toJSON(),
                factions: this.get('factions').toJSON(),
                players: this.get('players').toJSON(),
                planets: Planets
            }
        };
        return resp;
    }
});

var Player = Backbone.Model.extend({
    defaults: {
        name: "UnsetPlayerName",
        points: 0,
        notes: []
    },
    initialize: function(){
<<<<<<< HEAD
        //console.log("New Player model created");
=======

>>>>>>> CampaignBuild
    }
});

var Battle = Backbone.Model.extend({
    initialize: function() {
<<<<<<< HEAD
        //console.log("new battle");
=======

>>>>>>> CampaignBuild
    }

});

var Faction = Backbone.Model.extend({
    defaults: {
        name: 'UnsetFactionName',
        points: 0
    },
    initialize: function(){
<<<<<<< HEAD
        //console.log('new faction');
=======
       
>>>>>>> CampaignBuild
    }
});

var Territory = Backbone.Model.extend({
    initialize: function() {
<<<<<<< HEAD
        //console.log("New Territory Model Created");
=======

>>>>>>> CampaignBuild
    },
    defaults: {
        type: "Default Type",
        owner: "Default Owner",
        notes: "blank for now"
    }
});
