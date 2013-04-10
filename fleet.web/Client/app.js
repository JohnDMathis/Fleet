function log(str) {
    console.log(str);
}

require.config({
    paths: {
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        marionette:'lib/marionette'
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
        }
    }
});

require(["marionette" ], function (Marionette) {
    window.Fleet = new Marionette.Application();
    Fleet.addRegions({
        header: "#header-region",
        body: "#body-region"
    });
    
    require(["modules/inventory/controller"], function () {
        log('Fleet.start()');
        Fleet.start();
    }); 
});

