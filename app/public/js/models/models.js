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
