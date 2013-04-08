(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <div class=\"campaignItem "
    + escapeExpression(((stack1 = ((stack1 = depth0.campaign),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n            <a href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.campaign),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\r\n        </div>\r\n    ";
  return buffer;
  }

  buffer += "<div id=\"campaignListHolder\">\r\n    ";
  stack1 = helpers.each.call(depth0, depth0.campaigns, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n<div id=\"newCampaign\">\r\n    <a href=\"#\">+</a>\r\n</div>";
  return buffer;
  });
})();