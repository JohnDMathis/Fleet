Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {
    Fleet.addInitializer(function() {
        log('Fleet module ready');
        $("h1").html('Fleet module is Ready');
    });
});
