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
            self.getNewPlanetData($('.planetCreationView').length, function(planetData){
                console.log("Got the planets");
                console.log(planetData.length);
                for(var i = 0; i < planetData.length; i++){
                    var currentPlanet = planetData[i];
                    console.log(currentPlanet);
                    var context = $('.planetCreationView').eq(i);
                    var view = $('.territoryCountNumber', context);
                    console.log(view.val());
                    self.getNewTerritoryData(view.val(), function(territoryData){
                        currentPlanet.territories = territoryData;
                    });
                }
            });
        });
    },
    getNewPlanetData: function(numberOfPlanets, callback){
        console.log("getNewPlanetData: numberOfPlanets: " + numberOfPlanets);
        var planets = [];
        for(var i = 0; i <= numberOfPlanets; i++) {
            $.getJSON('../data/blankPlanet.json', function(data){
                if(planets.length < numberOfPlanets){
                    planets.push(data);
                } else {
                    callback(planets);
                }
            });
        }
    },
    getNewTerritoryData: function(numberOfTerritories, callback){
        console.log("getNewTerritoryData: numberOfTerritories: " + numberOfTerritories);
        var territories = [];
        for(var i = 0; i <= numberOfTerritories; i++) {
            $.getJSON('../data/blankTerritory.json', function(data){
                if(territories.length < numberOfTerritories){
                    territories.push(data);
                } else {
                    callback(territories);
                }
            });
        }
    }
});