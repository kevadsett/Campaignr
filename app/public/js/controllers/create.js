Campaignr.Controllers.create = Content.extend({
    init: function() {
        this.data = {planetNumber:0};
        console.log('create');
        this.numberPlanetsCreated=0;
    },
    events:{
        "keyup #campaignNameTxt":"determineCreationToolsVisibility",
        "click #newPlanetButton a": "addNewPlanetCreationTool"
    },
    determineCreationToolsVisibility: function(){
        if(this.value !== ""){
            $('.planetCreator').removeClass('hidden');
            $('#createCampaignBtn').removeClass('hidden');
        }else{
            $('.planetCreator').addClass('hidden');
            $('#createCampaignBtn').addClass('hidden');
        }
    },
    addNewPlanetCreationTool: function(e){
        e.preventDefault();
        this.numberPlanetsCreated++;
        var template = Handlebars.partials["newPlanetPartial"];
        var html = template({planetNumber:this.numberPlanetsCreated});
        $('#planetList').append(html);
    }
});