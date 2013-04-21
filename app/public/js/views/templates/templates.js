(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div id=\"campaignHeader\"></div>\r\n<form id=\"newCampaignForm\" action=\"newCampaign\" method=\"post\">\r\n    <input name=\"campaignName\" placeholder=\"New Campaign Name\" id=\"campaignNameTxt\"/>\r\n    <div id=\"planetCreationViews\" class=\"hidden\">\r\n        <div id=\"planetList\">\r\n            ";
  stack1 = self.invokePartial(partials.newPlanetPartial, 'newPlanetPartial', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        <div id=\"newPlanetCreatorButton\">\r\n            <a href=\"#\">+</a>\r\n        </div>\r\n    </div>\r\n    <input type=\"button\" value=\"Done\" id=\"createCampaignButton\" class=\"hidden\"/>\r\n</form>\r\n<div id=\"url\" class=\"hidden\">\r\n</div>\r\n<div id=\"planetCreation\">\r\n</div>";
  return buffer;
  });
templates['edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <div id=\"";
  if (stack1 = helpers.uid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"planet-slide\">\r\n            <canvas id=\"canvas-";
  if (stack1 = helpers.uid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"class=\"planet-canvas\" width=\"300\" height=\"300\"></canvas>\r\n        </div>\r\n    ";
  return buffer;
  }

  buffer += "<div id=\"slide-holder\">\r\n    ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.campaign),stack1 == null || stack1 === false ? stack1 : stack1.planets), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n</div>";
  return buffer;
  });
templates['home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n        <div class=\"campaignItem "
    + escapeExpression(((stack1 = ((stack1 = depth0.campaign),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n            <a href=\"#/";
  if (stack2 = helpers._id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0._id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">"
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