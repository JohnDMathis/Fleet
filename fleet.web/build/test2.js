(function() {
var template = Handlebars.template, templates = myApp.templates = myApp.templates || {};
templates['body'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "This is the body of the main module\r\n<div>\r\n    <div id=\"inventory-btn\" class=\"btn btn-primary\">Load Inventory Module</div>\r\n</div>";
  });
}());