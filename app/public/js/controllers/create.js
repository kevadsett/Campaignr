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
        "blur #campaignNameTxt":"determineCreationToolsVisibility",
        "click #newPlanetCreatorButton a": "addNewPlanetCreationView",
        "click .removePlanetCreatorButton a": "removePlanetCreationView",
        "click #createCampaignButton":"generateAndSubmitCampaign"
    },
    determineCreationToolsVisibility: function(){
        if(this.value !== ""){
            $('#planetCreationViews').removeClass('hidden');
            $('#createCampaignButton').removeClass('hidden');
        }else{
            $('#planetCreationViews').addClass('hidden');
            $('#createCampaignButton').addClass('hidden');
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
            self.newCampaign.owner = "__me";
            self.newCampaign.players[0].name = "__me";
            $('.planetCreationView').each(function(){
                var view = this;
                $.getJSON('../data/blankPlanet.json', function(data){
                    data.name = $('.planetNameTxt', view).val();
                    self.newCampaign.planets.push(data);
                    console.log(self.newCampaign);
                });
            });
        });
        
    }
});