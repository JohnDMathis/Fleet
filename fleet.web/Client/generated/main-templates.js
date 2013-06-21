this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["main"] = this["Handlebars"]["main"] || {};

this["Handlebars"]["main"]["body"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "This is the body of the main module\r\n<div>\r\n    <div id=\"inventory-btn\" class=\"btn btn-primary\">Load Inventory Module</div>\r\n</div>";
  });

this["Handlebars"]["main"]["footer"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h3>Main Footer</h3>";
  });

this["Handlebars"]["main"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h2>Main Header</h2>\r\n";
  });