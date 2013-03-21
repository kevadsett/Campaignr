var Player = Backbone.Model.extend({
    defaults:{
        name: 'UnsetPlayerName',
        points: 0,
        notes: []
    },
    intialize:function(){
        console.log('New Player model created');
    }
});
        
var Faction = Backbone.Model.extend({
    defaults:{
        name: 'UnsetFactionName',
        points: 0
    },
    intialize:function(){
        this.set({players: new PlayerCollection()});
    }
});

var PlayerCollection = Backbone.Model.extend({
    model: Player
});

var Territory = Backbone.Model.extend({
    initialize: function() {
        console.log('New Territory Model Created');
    },
    defaults: {
        type: 'Default Type',
        owner: 'Default Owner',
        notes: 'blank for now'
    }
});
