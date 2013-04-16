// define base module elements; other module files may depend
// on this, but it must not depend on any other module files
Fleet.module("Main", function (Main) {
    Main.prefix = "main-";
    Main.views = {};
    Main.baseViews = {};
    Main.baseViews.ItemView = Marionette.ItemView.extend({
        module: Main
    });
});


// define the loader last. generally, it should depend on all
// module files, otherwise they may not get loaded
var dependencies = [
    "modules/main/views/header",
    "modules/main/views/footer",
    "modules/main/views/body"
];

if (window.AppIsReleased) {
    dependencies.push('generated/main-templates');
}

define(dependencies,
    function () {
        Fleet.module("Main", function (Main, Fleet, Backbone, Marionette, $, _) {
            

            Fleet.addInitializer(function () {
                // load templates for this module
                if (window.AppIsReleased) {
                    // store precompiled templates as templateCaches and go!
                    Marionette.TemplateCache.storePrecompiledTemplates(Handlebars.templates);
                    this.Main.show();
                } else {
                    var templatesToLoad = [];
                    for (var viewName in Fleet.Main.views) {
                        var view = Fleet.Main.views[viewName];
                        view.prototype.template = Main.prefix + view.prototype.template;
                        templatesToLoad.push(view.prototype.template);
                    }
                    Marionette.TemplateCache.templatePath = 'client/modules/main/templates/';
                    var loadingTemplates = Marionette.TemplateCache.preloadTemplates(templatesToLoad, this.Main);
                    $.when(loadingTemplates).done(this.Main.show);
                }
            });
        });
    });

