
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

