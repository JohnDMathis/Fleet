// define base module elements; other module files may depend
// on this, but it must not depend on any other module files
Fleet.module("Inventory", function (Inventory) {
        Inventory.views = {};
    });


// define the controller last. generally, it should depend on all
// module files, otherwise they may not get loaded
define([
        "modules/inventory/views/header",
        "modules/inventory/views/footer",
        "modules/inventory/views/body"
    ],
    function() {
        Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {
            this.show = function() {
                this.headerView = new this.views.HeaderView();
                this.footerView = new this.views.FooterView();
                var bodyModel = new Backbone.Model({ message: "Inventory module is started" });
                this.bodyView = new this.views.BodyView({ model: bodyModel });
                
                Fleet.header.show(this.headerView);
                Fleet.footer.show(this.footerView);
                Fleet.body.show(this.bodyView);
            };
            
            Fleet.addInitializer(function () {
                // load templates for this module
                var templatesToLoad = [];
                for (var viewName in Fleet.Inventory.views) {
                    var view = Fleet.Inventory.views[viewName];
                    templatesToLoad.push(view.prototype.template);
                }
                Backbone.Marionette.TemplateCache.templatePath = 'client/modules/inventory/views/';
                var loadingTemplates = Backbone.Marionette.TemplateCache.preloadTemplates(templatesToLoad, this.Inventory);
                $.when(loadingTemplates).done(Fleet.Inventory.show);
            });
        });
    });
    
