
function LoginController()
{
$.getJSON('/data/campaigns.json', function(data){
        $.each(data, function(i,d){
            dataSetup(d);
        });
});
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
// bind event listeners to button clicks //

	$('#login-form #forgot-password').click(function(){ $('#get-credentials').modal('show');});

// automatically toggle focus between the email modal window and the login form //

    $('#get-credentials').on('shown', function(){ $('#email-tf').focus(); });
	$('#get-credentials').on('hidden', function(){ $('#user-tf').focus(); });

}