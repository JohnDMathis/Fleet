
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
    
    // PLACEHOLDER. DO NOT REMOVE! When "Unifying" this module, external module files will be inserted here.

    this.start = function () {
        Marionette.ModuleHelper.loadModuleTemplates(Main, Main.show, window.AppIsReleased);
    };
    
    Fleet.addInitializer(this.start);
    
});

// SECTION DELIMITER. DO NOT REMOVE! Code below this line will not be included in release mode.

// Recommended: define all dependencies for this module here.
// while you could spread dependency requirements
// over all your module files on purely "as needed" basis,
// this adds to complication of code in your module files
// defining them all, here, has the advantage of limiting use of RequireJS
// to this loader file only

define(
    ["modules/main/controller",
    "modules/main/views/header",
    "modules/main/views/footer",
    "modules/main/views/body"
], function () {
    Fleet.Main.start();
});

