log('header');

define(["modules/inventory/inventory"], function () {
    log('header require callback');
    Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {
        log('header module def');
        Inventory.views.HeaderView = Marionette.ItemView.extend({
            template: "#header"
        });
    });
    return;
});