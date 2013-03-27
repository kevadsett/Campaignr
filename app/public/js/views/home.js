var currentCampaign;
$(document).ready(function(){
    var app = new App();
    
    Campaigns.on('loaded', function(){
        currentCampaign = Campaigns.at(0);
        getMyBattles();
    });

    function getMyBattles(){
        var battles = currentCampaign.get('battles');
        console.log(battles);
        _.each(battles, function(element, index){
            console.log(battles.at(index));
        });
        
    }
})