Campaignr.Controllers.create = Content.extend({
    init: function() {
        this.data = {planetNumber:0};
        console.log('create');
        this.numberPlanetsCreated=0;
        this.newCampaign = {};
    },
    setup: function(){
        console.log('setup create');
        var self = this;
        $.getJSON('../data/blankCampaign.json', function(data){
            self.newCampaign = data.campaign;
        });
    },
    events:{
        "keyup #campaignNameTxt":"determineCreationToolsVisibility",
        "click #newPlanetCreatorButton a": "addNewPlanetCreationView",
        "click .removePlanetCreatorButton a": "removePlanetCreationView"
    },
    determineCreationToolsVisibility: function(){
        if(this.value !== ""){
            $('#planetCreationViews').removeClass('hidden');
            $('#createCampaignBtn').removeClass('hidden');
        }else{
            $('#planetCreationViews').addClass('hidden');
            $('#createCampaignBtn').addClass('hidden');
        }
    },
    addNewPlanetCreationView: function(e){
        e.preventDefault();
        this.numberPlanetsCreated++;
        var template = Handlebars.partials["newPlanetPartial"];
        var html = template({planetNumber:this.numberPlanetsCreated});
        $('#planetList').append(html);
    },
    removePlanetCreationView: function(e){
        e.preventDefault();
        console.log($(e.target).parents('.planetCreationView'));
        $(e.target).parents('.planetCreationView').remove();
    }
});