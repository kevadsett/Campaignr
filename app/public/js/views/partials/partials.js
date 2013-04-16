(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials['newPlanetPartial'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"newPlanet\">\n    <input name=\"planetName\" placeholder=\"Planet name\" class=\"planetNameTxt\"></input>\n    <label name=\"territoryCount\">Number of territories:</label>\n    <input type=\"number\" name=\"territories\"></input>\n</div>";
  });
})();