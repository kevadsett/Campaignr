(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div id=\"campaignHeader\"></div>\r\n<form id=\"newCampaignForm\" action=\"newCampaign\" method=\"post\">\r\n    <input name=\"campaignName\" placeholder=\"New Campaign Name\" id=\"campaignNameTxt\"/>\r\n    <div id=\"planetCreationViews\" class=\"hidden\">\r\n        <div id=\"planetList\">\r\n            ";
  stack1 = self.invokePartial(partials.newPlanetPartial, 'newPlanetPartial', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        <div id=\"newPlanetCreatorButton\">\r\n            <a href=\"#\">+</a>\r\n        </div>\r\n    </div>\r\n    <input type=\"button\" value=\"Done\" id=\"createCampaignBtn\" class=\"hidden\"/>\r\n</form>\r\n<div id=\"url\" class=\"hidden\">\r\n</div>\r\n<div id=\"planetCreation\">\r\n</div>";
  return buffer;
  });
templates['edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\r\n        <div class=\"planet-slide\">\r\n            <canvas style=\"width:300px; height:300px;\">\r\n            </canvas>\r\n        </div>\r\n    ";
  }

  buffer += "<div id=\"slide-holder\">\r\n    ";
  stack1 = helpers.each.call(depth0, depth0.planet, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });
templates['home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <div class=\"campaignItem "
    + escapeExpression(((stack1 = ((stack1 = depth0.campaign),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n            <a href=\"#/home\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.campaign),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\r\n        </div>\r\n    ";
  return buffer;
  }

  buffer += "<div id=\"campaignListHolder\">\r\n    ";
  stack1 = helpers.each.call(depth0, depth0.campaigns, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <div class=\"newCampaignButton\">\r\n        <a href=\"#/create\">Create new campaign</a>\r\n    </div>\r\n</div>";
  return buffer;
  });
templates['main'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"wrapper\">\r\n    <div id=\"header\">\r\n    </div>\r\n    <div id=\"content\">\r\n    </div>\r\n    <div id=\"nav\" class=\"hidden\">\r\n        <div class=\"navItem\">\r\n            <a href=\"#\">item1</a>\r\n        </div>\r\n        <div class=\"navItem\">\r\n            <a href=\"#\">item2</a>\r\n        </div>\r\n        <div class=\"navItem\">\r\n            <a href=\"#\">item3</a>\r\n        </div>\r\n        <div class=\"navItem\">\r\n            <a href=\"#\">item4</a>\r\n        </div>\r\n    </div>\r\n</div>";
  });
})();