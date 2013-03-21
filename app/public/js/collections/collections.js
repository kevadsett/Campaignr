var Planet = Backbone.Collection.extend({
    model: Territory,
    initialize: function() {
        this.attributes = {};
        console.log('New Planet Collection Created');
        this.on('add', console.log('Territory Pushed'));
        this.on('change', this.update, this);
    },
    attribute: function(attr, val){
        if(val){
            this.atrributes[attr] = val;
            return true;
        }
        return this.attributes[attr] ;
    },
    update: function() {
        this.sync();
    }
});