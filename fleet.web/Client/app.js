

require.config({
    paths: {
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        marionette: 'lib/marionette',
        modulehelper: 'lib/modulehelper',
        handlebars:(function () {
            var path = 'lib/handlebars';
            if (window.AppIsReleased) path += '.runtime';
            return path;
        })()
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
        modulehelper: {
            deps: ["marionette"]
        }
    }
});


require(["marionette", "handlebars", "modulehelper"], function (Marionette) {
    window.Fleet = new Marionette.Application();
    Fleet.addRegions({
        header: "#header-region",
        footer: "#footer-region",
        body1: "#body1-region",
        body2: "#body2-region"
    });

    Fleet.modules = function (name, arr) {
        if(_.isUndefined(arr)) arr = [];
        if (_.isObject(name)) {
            _.each(name, function (thisName) {
                Fleet.modules(thisName, arr);
            });
            return arr;
        }
        if (window.AppIsReleased)
            arr.push("generated/" + name);
        else
            arr.push("modules/" + name + "/loader");
        return arr;
    };


    require(Fleet.modules("main"), function () {
        Fleet.start();
    });

    Fleet.commands.setHandler("inventoryModuleRequested", function() {
        require(Fleet.modules("inventory"));
    });


});

