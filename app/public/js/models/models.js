var Campaign = Backbone.Model.extend({
    initialize: function() {
        //console.log("new campaign");
    },
    parse: function(resp){
        var Planets = _.reduce(resp.campaign.planets, function(memo, planet){
            var p = new Planet(planet.territories);
            p.collectionAttr("name", planet.name);
            p.collectionAttr("notes", planet.notes);
            memo.push(p);
            return memo;
        }, []);
        resp = {
            _id:resp._id,
            name: resp.campaign.name,
            owner: resp.campaign.owner,
            players: new Players(resp.campaign.players),
            battles: new Battles(resp.campaign.battles),
            factions: new Factions(resp.campaign.factions),
            planets:Planets
        }
        return resp;
    },
    toJSON:function(){
        var Planets = _.reduce(this.get('planets'), function(memo, planet){
            var p = {
                uid: planet.collectionAttr("uid"),
                name: planet.collectionAttr("name"),
                notes: planet.collectionAttr("notes"),
                territories: planet.toJSON()
            }
            memo.push(p);
            return memo;
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
    }
});

var Battle = Backbone.Model.extend({
    initialize: function() {
    }

});

var Faction = Backbone.Model.extend({
    defaults: {
        name: 'UnsetFactionName',
        points: 0
    },
    initialize: function(){
    }
});

var Territory = Backbone.Model.extend({
    initialize: function() {
    },
    defaults: {
        type: "Default Type",
        owner: "Default Owner",
        notes: "blank for now"
    }
});
