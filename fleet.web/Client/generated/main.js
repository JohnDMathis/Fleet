
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
// loader for Main module
// the 'loader' includes initial module definition and manages the loading
// of all module files including javascript and templates
// this file should be config / boilerplate; keep 


// define base module elements; other module files may depend
// on this, but it must not depend on any other module files

Fleet.module("Main", function (Main, Fleet, Backbone, Marionette, $, _) {
    Main.prefix = "main";
    Main.templatePath = "client/modules/main/templates/";
    Main.views = {};
    Main.template = function(str) {
        return Main.prefix + '-' + str;
    };
    
       this.show = function () {
        this.headerView = new this.views.HeaderView();
        this.footerView = new this.views.FooterView();
        this.bodyView = new this.views.BodyView();
        
        Fleet.header.show(this.headerView);
        Fleet.body1.show(this.bodyView);
        Fleet.footer.show(this.footerView);
    };
    this.onTemplatesLoaded = function() {
        this.show();
    };
    
    Main.views.BodyView = Marionette.ItemView.extend({
        className:"well well-small",
        template: this.template("body"),
        events: {
            "click #inventory-btn": "inventoryModuleRequested"
        },
        inventoryModuleRequested:function () {
            Fleet.execute("inventoryModuleRequested");
        }
    });
    Main.views.FooterView = Marionette.ItemView.extend({
        template: this.template("footer")
    });
    Main.views.HeaderView = Marionette.ItemView.extend({
        template: this.template("header"),
        tagName: "div",
        className:"well well-small"
    });

    this.start = function () {
        Marionette.ModuleHelper.loadModuleTemplates(Main, Main.show, window.AppIsReleased);
    };
    
    Fleet.addInitializer(this.start);
    
});

