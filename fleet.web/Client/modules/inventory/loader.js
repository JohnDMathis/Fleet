
// loader for Inventory module
// the 'loader' includes initial module definition and manages the loading
// of all module files including javascript and templates
// this file should be config / boilerplate; keep 


// define base module elements; other module files may depend
// on this, but it must not depend on any other module files

Fleet.module("Inventory", function () {
    this.prefix = "inv-";
    this.templatePath = "client/modules/inventory/templates/";
    this.views = {};
});



// Recommended: define all dependencies for this module
// while you could spread dependency requirements
// over all your module files on purely "as needed" basis,
// this adds to complication of code in your module files
// defining them all, here, has the advantage of limiting use of RequireJS
// to this loader file only

var dependencies = [
    "modules/inventory/controller",
    "modules/inventory/views/body"
];


// only when in 'release' mode, depend on the generated templates file
if (window.AppIsReleased) {
    dependencies.push('generated/inv-templates');
}

// define the loader last. generally, it should depend on all
// module files, otherwise they may not get loaded
define(dependencies,
    function () {
        Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {
            
            Fleet.addInitializer(function () {
                // load templates for this module
                Marionette.ModuleHelper.loadModuleTemplates(Fleet.Inventory, Fleet.Inventory.show);
            });
        });
    });
    
