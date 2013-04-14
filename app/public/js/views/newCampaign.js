(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newCampaign'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"campaignBuilder\">\r\n    <div id=\"campaignHeader\"></div>\r\n    <form id=\"newCampaignForm\" action=\"newCampaign\" method=\"post\">\r\n        <input name=\"campaignName\" placeholder=\"Campaign Name\" id=\"campaignNameTxt\"/>\r\n        <div class=\"planetCreator hidden\">\r\n            <div id=\"planetList\">\r\n                <div class=\"newPlanet\" id=\"newPlanet0\">\r\n                    <input name=\"planetName\" placeholder=\"Planet name\" class=\"planetNameTxt></input>\r\n                    <label name=\"territoryCount\">Number of territories:</label>\r\n                    <input type=\"number\" name=\"territories\"></input>\r\n                </div>\r\n            </div>\r\n            <div id=\"newPlanetButton\">\r\n                <a href=\"#\">+</a>\r\n            </div>\r\n        </div>\r\n        <input type=\"submit\" value=\"Done\" />\r\n    </form>\r\n    <div id=\"url\" class=\"hidden\">\r\n    </div>\r\n    <div id=\"planetCreation\">\r\n    </div>\r\n</div>";
  });
})();