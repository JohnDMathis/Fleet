define(["modules/inventory/controller"], function () {
    Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {

        Inventory.views.BodyView = Marionette.ItemView.extend({
            template: "#body"
        });

    });
});