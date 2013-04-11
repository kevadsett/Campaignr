$(document).ready(function() {
    console.log($('#newCampaignForm'));
    $('#newCampaignForm').addClass("myNewClass");
    $('#newCampaignForm').submit(function(e){
        console.log(e);
        e.preventDefault();
        console.log("Submit pressed");
    });
});