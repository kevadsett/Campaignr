Campaignr.Controllers.create = Content.extend({
    init: function() {
        console.log('create');
        var numberPlanetsCreated=0;
        $('#campaignNameTxt').keyup(function(){
            if(this.value !== ""){
                $('.planetCreator').removeClass('hidden');
                $('#createCampaignBtn').removeClass('hidden');
            }else{
                $('.planetCreator').addClass('hidden');
                $('#createCampaignBtn').addClass('hidden');
            }
        });
        
        $('#newPlanetButton a').click(function(e){
            e.preventDefault();
            numberPlanetsCreated++;
            $('#planetList').append('<div class="newPlanet" id="newPlanet' + numberPlanetsCreated + '"><input name="planetName" placeholder="Planet name" class="planetNameTxt"></input><label name="territoryCount">Number of territories:</label><input type="number" name="territories"></input></div>');
        });
    },
    events:{
        "keyup #campaignNameTxt":"determineCreationToolsVisibility",
        "click #newPlanetButton a": "addNewPlanetCreationTool"
    }
});