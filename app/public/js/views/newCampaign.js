(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newCampaign'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"campaignBuilder\">\r\n    <div id=\"campaignHeader\">\r\n        <form id=\"newCampaignForm\">\r\n            <input name=\"campaignName\" placeholder=\"Campaign Name\"></input>\r\n            <div id=\"url\" class=\"invisible\">\r\n            </div>\r\n            <button action=\"submit\" name=\"Submit\">Add campaign</button>\r\n        </form>\r\n        \r\n        <div id=\"submitButton\">\r\n        </div>\r\n    </div>\r\n    <div id=\"planetCreation\">\r\n    </div>\r\n</div>";
  });
})();