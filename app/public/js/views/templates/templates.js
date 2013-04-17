(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"campaignItem "
    + escapeExpression(((stack1 = ((stack1 = depth0.campaign),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <a href=\"#/home\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.campaign),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n        </div>\n    ";
  return buffer;
  }

  buffer += "<div id=\"campaignListHolder\">\n    ";
  stack1 = helpers.each.call(depth0, depth0.campaigns, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<div id=\"campaignBuilder\">\n</div>";
  return buffer;
  });
templates['main'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"wrapper\">\n    <div id=\"header\">\n    </div>\n    <div id=\"content\">\n    </div>\n    <div id=\"nav\">\n        <div class=\"navItem\">\n            <a href=\"#\">item1</a>\n        </div>\n        <div class=\"navItem\">\n            <a href=\"#\">item2</a>\n        </div>\n        <div class=\"navItem\">\n            <a href=\"#\">item3</a>\n        </div>\n        <div class=\"navItem\">\n            <a href=\"#\">item4</a>\n        </div>\n    </div>\n</div>";
  });
templates['newCampaign'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div id=\"campaignHeader\"></div>\n<form id=\"newCampaignForm\" action=\"newCampaign\" method=\"post\">\n    <input name=\"campaignName\" placeholder=\"New Campaign Name\" id=\"campaignNameTxt\"/>\n    <div class=\"planetCreator hidden\">\n        <div id=\"planetList\">\n            ";
  stack1 = self.invokePartial(partials.newPlanetPartial, 'newPlanetPartial', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div id=\"newPlanetButton\">\n            <a href=\"#\">+</a>\n        </div>\n    </div>\n    <input type=\"submit\" value=\"Done\" id=\"createCampaignBtn\" class=\"hidden\" />\n</form>\n<div id=\"url\" class=\"hidden\">\n</div>\n<div id=\"planetCreation\">\n</div>";
  return buffer;
  });
})();