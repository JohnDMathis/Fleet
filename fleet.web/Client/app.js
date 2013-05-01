
require.config({
    paths: {
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        marionette: 'lib/marionette',
        modulehelper: 'lib/modulehelper',
        handlebars: 'lib/handlebars'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        handlebars: {
            exports: 'Handlebars'
        },
        modulehelper: {
            deps: ["marionette"]
        }
    }
});

require(["marionette","handlebars", "modulehelper" ], function (Marionette, Handlebars) {
    // use handlebars instead of underscore templates
    Marionette.TemplateCache.prototype.compileTemplate = function (template) {
        return Handlebars.compile(template);
    };

    
    window.Fleet = new Marionette.Application();
    Fleet.addRegions({
        header: "#header-region",
        footer: "#footer-region",
        body1: "#body1-region",
        body2: "#body2-region"
    });
    
    require(["modules/main/loader"], function () {
        Fleet.start();
    });

    Fleet.commands.setHandler("moduleRequested", function(moduleName) {
        require(["modules/" + moduleName + "/loader"]);
    });

});

