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
            self.newCampaign.name = $('#campaignNameTxt').val();
            self.newCampaign.owner = "__me";
            self.newCampaign.players[0].name = "__me";
            var numberOfPlanets = $('.planetCreationView').length;
            var populatedPlanets = 0;
            self.newCampaign.planets = new Array(numberOfPlanets);
            self.getNewPlanetData(numberOfPlanets, function(planetData){
                _.each(planetData, function(planetDatum, index){
                    planetDatum.id = index;
                    self.populatePlanetData(planetDatum, function(populatedPlanetData){
                        populatedPlanets++;
                        self.newCampaign.planets[populatedPlanetData.id] = populatedPlanetData;
                        if(populatedPlanets == numberOfPlanets){
                            self.allPlanetsDone();
                        }
                    });
                });
            });
        });
    },
    populatePlanetData: function(planetDatum, callback) {
        var context = $('.planetCreationView').eq(planetDatum.id);
        planetDatum.name = $('.planetNameTxt', context).val();
        var view = $('.territoryCountNumber', context);
        var numberOfTerritories = view.val();
        this.getNewTerritoryData(numberOfTerritories, function(territoryData){
            for(var i=0; i<territoryData.length; i++){
                territoryData[i].id = planetDatum.id + "_ter_" + i;
            }
            planetDatum.territories = territoryData;
            callback(planetDatum);
        });
    },
    allPlanetsDone: function(){
        console.log(this.newCampaign);
        $.post('createCampaign', {campaign: this.newCampaign});
    },
    getNewPlanetData: function(numberOfPlanets, callback){
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