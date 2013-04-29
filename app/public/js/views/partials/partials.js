(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials['newFactionPartial'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"factionCreationView\" data-factionNumber=\"";
  if (stack1 = helpers.factionNumber) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.factionNumber; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\r\n    <div class=\"removeFactionCreatorButton\">\r\n        <a href=\"#\">–</a>\r\n    </div>\r\n    <input name=\"factionName\" placeholder=\"Faction name\" class=\"factionNameTxt\"></input>\r\n</div>";
  return buffer;
  });
Handlebars.partials['newPlanetPartial'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"planetCreationView\" data-planetNumber=\"";
  if (stack1 = helpers.planetNumber) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.planetNumber; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\r\n    <div class=\"removePlanetCreatorButton\">\r\n        <a href=\"#\">–</a>\r\n    </div>\r\n    <input name=\"planetName\" placeholder=\"Planet name\" class=\"planetNameTxt\"></input>\r\n    <label name=\"territoryCount\">Number of territories:</label>\r\n    <input type=\"number\" name=\"territories\" class=\"territoryCountNumber\"></input>\r\n</div>";
  return buffer;
  });
})();