var App = Backbone.View.extend({
    el: "body",
    initialize: function() {
        var self = this;
        Campaignr.Campaigns.fetch({success: function(){
            Campaignr.Router = new Router();
        }});
        this.render();
    },
    render: function() {
        var html = Handlebars.templates["main"];
        this.$el.html(html);
        //var campaignBuilderTemplate = Handlebars.templates["newCampaign"];
        //$('#campaignBuilder').append(campaignBuilderTemplate);
    }
})

var Content = Backbone.View.extend({
    el: "#content",
    initialize: function() {
        this.init();
        console.log('content view init');
        this.render();
    },
    render: function() {
        var template = Handlebars.templates[Campaignr.Location];
        var data = {campaigns: Campaignr.Campaigns.toJSON()};
        console.log(data);
        var html = template(data);
        this.$el.html(html);
        this.setup()
    },
    setup: function () {
        console.log('setup');
    },
    init: function () {
    
    }
});

var HomeController = Content.extend({
    setup: function () {
        app.on('appRendered', function() {
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
        });
        console.log('homeController');
    }
});

var CreateController = Content.extend({
    init: function() {
        console.log('create');
    },
});