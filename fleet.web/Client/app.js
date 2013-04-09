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
    $("h1").html('Marionette is Ready');
    window.Fleet = new Marionette.Application();
});
