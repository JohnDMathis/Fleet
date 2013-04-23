
require.config({
    paths: {
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        marionette: 'lib/marionette',
        common: 'lib/mycommon',
        handlebars:'lib/handlebars'
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
            exports:"Marionette"
        },
        common: {
            deps: ["marionette"]
        }
    }
});

require(["marionette","handlebars", "common" ], function (Marionette) {
    window.Fleet = new Marionette.Application();
    Fleet.addRegions({
        header: "#header-region",
        footer: "#footer-region",
        body1: "#body1-region",
        body2: "#body2-region"
    });
    
    require(["modules/main"], function () {
        Fleet.start();
    });

    //Fleet.commands.setHandler("inventoryModuleRequested", function() {
    //    require(["modules/inventory/loader"]);
    //});

});

