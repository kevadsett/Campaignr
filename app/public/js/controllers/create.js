Campaignr.Controllers.create = Content.extend({
    init: function() {
        this.data = {planetNumber:0};
        console.log('create');
        this.numberPlanetsCreated=0;
    },
    setup: function(){
        console.log('setup create');
    },
    events:{
        "keyup #campaignNameTxt":"determineCreationToolsVisibility",
        "click #newPlanetCreatorButton a": "addNewPlanetCreationView",
        "click .removePlanetCreatorButton a": "removePlanetCreationView",
        "click #createCampaignButton":"generateAndSubmitCampaign"
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
    },
    generateAndSubmitCampaign: function(){
        var self = this;
        $.getJSON('../data/blankCampaign.json', function(data){
            self.newCampaign = data.campaign;
        });
        this.newCampaign.owner = "__me";
        this.newCampaign.players[0].name = "__me";
    }
});