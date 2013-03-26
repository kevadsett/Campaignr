
$(document).ready(function(){
    function dataSetup(campaign) {
        var Planets = _.reduce(campaign.planets, function(planets, planet){
            var p = new Planet(planet.territories);
            p.collectionAttr("name", planet.name);
            planets.push(p);
            return planets;
        }, []);
        var campaignModel = new Campaign({
            name: campaign.name,
            owner: campaign.owner,
            players:new Players(campaign.players),
            battles: new Battles(campaign.battles),
            factions: new Factions(campaign.factions),
            planets: Planets
        });
        console.log(campaignModel);
    };
    for(i=0;i < campaigns.length; i++){
        dataSetup(campaigns[i].campaign);
    }
})