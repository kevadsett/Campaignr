Campaignr.Controllers.create = Content.extend({
    init: function() {
        this.data = {planetNumber:0, factionNumber:0};
        console.log('create');
        this.numberFactionsCreated = 0;
        this.numberPlanetsCreated = 0;
    },
    setup: function(){
        console.log('setup create');
    },
    events:{
        "keyup #campaignNameTxt":"determineCreationToolsVisibility",
        "blur #campaignNameTxt":"determineCreationToolsVisibility",
        "click #newFactionCreatorButton a": "addNewFactionCreationView",
        "click .removeFactionCreatorButton a": "removeFactionCreationView",
        "click #newPlanetCreatorButton a": "addNewPlanetCreationView",
        "click .removePlanetCreatorButton a": "removePlanetCreationView",
        "click #createCampaignButton":"generateAndSubmitCampaign"
    },
    determineCreationToolsVisibility: function(){
        if(this.value !== ""){
            $('#factionCreationViews').removeClass('hidden');
            $('#planetCreationViews').removeClass('hidden');
            $('#createCampaignButton').removeClass('hidden');
        }else{
            $('#factionCreationViews').addClass('hidden');
            $('#planetCreationViews').addClass('hidden');
            $('#createCampaignButton').addClass('hidden');
        }
    },
    addNewFactionCreationView: function(e){
        e.preventDefault();
        this.numberFactionsCreated++;
        var template = Handlebars.partials["newFactionPartial"];
        var html = template({factionNumber:this.numberFactionsCreated});
        $('#factionList').append(html);
    },
    removeFactionCreationView: function(e){
        e.preventDefault();
        console.log($(e.target).parents('.factionCreationView'));
        $(e.target).parents('.factionCreationView').remove();
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
            var numberOfFactions = $('.factionCreationView').length;
            var populatedFactions = 0;
            self.newCampaign.factions = new Array(numberOfFactions);
            self.getNewFactionData(numberOfFactions, function(factionData){
                _.each(factionData, function(factionDatum, index){
                    var context = $('.factionCreationView').eq(index);
                    factionDatum.id = "faction_" + index;
                    factionDatum.name = $('.factionNameTxt', context).val();
                    self.newCampaign.factions[index] = factionDatum;
                });
            });
            
            self.numberOfPlanets = $('.planetCreationView').length;
            self.populatedPlanets = 0;
            self.newCampaign.planets = new Array(self.numberOfPlanets);
            self.getNewPlanetData(self.numberOfPlanets, function(planetData){
                _.each(planetData, function(planetDatum, index){
                    planetDatum.id = index;
                    self.populateTerritories(planetDatum, self.addPlanetToCampaign);
                });
            });
        });
    },
    addPlanetToCampaign: function(context, populatedPlanetData){
        context.populatedPlanets++;
        context.newCampaign.planets[populatedPlanetData.id] = populatedPlanetData;
        if(context.populatedPlanets == context.numberOfPlanets){
            context.allPlanetsDone();
        }
    },
    populateTerritories: function(planetDatum, callback) {
        var context = $('.planetCreationView').eq(planetDatum.id);
        planetDatum.name = $('.planetNameTxt', context).val();
        var view = $('.territoryCountNumber', context);
        var numberOfTerritories = view.val();
        var self = this;
        this.getNewTerritoryData(numberOfTerritories, function(territoryData){
            for(var i=0; i<territoryData.length; i++){
                territoryData[i].id = planetDatum.id + "_territory_" + i;
            }
            planetDatum.territories = territoryData;
            callback(self, planetDatum);
        });
    },
    allPlanetsDone: function(){
        console.log(this.newCampaign);
        $.post('createCampaign', this.newCampaign);
    },
    getNewFactionData: function(numberOfFactions, callback){
        var factions = [];
        for(var i = 0; i <= numberOfFactions; i++) {
            $.getJSON('../data/blankFaction.json', function(data){
                if(factions.length < numberOfFactions){
                    factions.push(data);
                } else {
                    callback(factions);
                }
            });
        }
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