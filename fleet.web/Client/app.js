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

require(["jquery", "underscore", "backbone", "marionette" ], function ($, _, Backbone, Marionette) {
    $("h1").html('Ready');
});