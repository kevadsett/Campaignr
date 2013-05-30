Campaignr.Controllers.edit = Content.extend({
    init: function () {
        console.log('edit');
        this.data = Campaignr.CurrentCampaign.toJSON();
    },
    setup: function () {
        
        /*
        _.each(Campaignr.CurrentCampaign.get('planets'), function(planet){
            new editPlanetController({collection: planet});
        });*/
    }
});