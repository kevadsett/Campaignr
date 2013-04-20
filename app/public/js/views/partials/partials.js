(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials['newPlanetPartial'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"planetCreator\" data-planetNumber=\"";
  if (stack1 = helpers.planetNumber) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.planetNumber; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\r\n    <input name=\"planetName\" placeholder=\"Planet name\" class=\"planetNameTxt\"></input>\r\n    <label name=\"territoryCount\">Number of territories:</label>\r\n    <input type=\"number\" name=\"territories\" class=\"territoryCountNumber\"></input>\r\n</div>";
  return buffer;
  });
})();