
// loader for Main module
// the 'loader' includes initial module definition and manages the loading
// of all module files including javascript and templates
// this file should be config / boilerplate; keep 


// define base module elements; other module files may depend
// on this, but it must not depend on any other module files
Fleet.module("Main", function (Main) {
    Main.prefix = "main";
    Main.templatePath = "client/modules/main/templates/";
    Main.views = {};
    Main.template = function(str) {
        return Main.prefix + '-' + str;
    };

});

// -- split here ------------------

// Recommended: define all dependencies for this module
// while you could spread dependency requirements
// over all your module files on purely "as needed" basis,
// this adds to complication of code in your module files
// defining them all, here, has the advantage of limiting use of RequireJS
// to this loader file only

var dependencies = [
    "modules/main/controller",
    "modules/main/views/header",
    "modules/main/views/footer",
    "modules/main/views/body"
];


// only when in 'release' mode, depend on the generated templates file
if (window.AppIsReleased) {
    dependencies.push('generated/main-templates');
}

// define the loader last. generally, it should depend on all
// module files, otherwise they may not get loaded
//define(dependencies,
define(["modules/main/controller",
    "modules/main/views/header",
    "modules/main/views/footer",
    "modules/main/views/body",
        "generated/main-templates"
],
    function () {
        Fleet.module("Main", function (Main, Fleet, Backbone, Marionette, $, _) {
            

            Fleet.addInitializer(function () {
                // load templates for this module
                Marionette.ModuleHelper.loadModuleTemplates(Fleet.Main, Fleet.Main.show);
            });
        });
    });

