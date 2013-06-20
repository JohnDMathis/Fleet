
// loader for Inventory module
// the 'loader' includes initial module definition and manages the loading
// of all module files including javascript and templates
// this file should be config / boilerplate; keep 


// define base module elements; other module files may depend
// on this, but it must not depend on any other module files

Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {
    this.prefix = "inv";
    this.templatePath = "client/modules/inventory/templates/";
    this.views = {};
    this.template = function (str) {
        return this.prefix + '-' + str;
    };
    
    // PLACEHOLDER. DO NOT REMOVE! When "Unifying" this module, external module files will be inserted here.

    this.start = function () {
            Marionette.ModuleHelper.loadModuleTemplates(Inventory, Inventory.show, window.AppIsReleased);
    };

    // call start() like this when this module is required immediately
    Fleet.addInitializer(this.start);
});

// SECTION DELIMITER. DO NOT REMOVE! Code below this line will not be included in release mode.

// Recommended: define all dependencies for this module here.
// while you could spread dependency requirements
// over all your module files on purely "as needed" basis,
// this adds to complication of code in your module files
// defining them all, here, has the advantage of limiting use of RequireJS
// to this loader file only

define([
    "modules/inventory/controller",
    "modules/inventory/views/body"
], function () {
    // call start like this when the module is not loaded immediately
    Fleet.Inventory.start();
});
    
