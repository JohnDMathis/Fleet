function log(str) {
    console.log(str);
}

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
            deps: ["marionette"],
            exports:"Common"
        }
    }
});

require(["marionette","handlebars", "common" ], function (Marionette) {
    window.Fleet = new Marionette.Application();
    Fleet.addRegions({
        header: "#header-region",
        footer: "#footer-region",
        body: "#body-region"
    });
    
    require(["modules/inventory/controller"], function () {
        Fleet.start();
    }); 
});

