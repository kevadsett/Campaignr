(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newCampaign'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"campaignBuilder\">\r\n    <div id=\"campaignHeader\">\r\n        <form id=\"newCampaignForm\">\r\n            <input name=\"campaignName\" placeholder=\"Campaign Name\"></input>\r\n            <div id=\"url\" class=\"invisible\">\r\n            </div>\r\n            <input type=\"submit\" value=\"Add campaign\" />\r\n        </form>\r\n        \r\n        <div class=\"planetCreator hidden\">\r\n            <form class=\"newPlanet\">\r\n                <input name=\"planetName\" placeholder=\"Planet name\"></input>\r\n                <input type=\"number\" name=\"territories\"></input>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <div id=\"planetCreation\">\r\n    </div>\r\n</div>";
  });
})();