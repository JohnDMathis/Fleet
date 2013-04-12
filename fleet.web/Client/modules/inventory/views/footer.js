define(["modules/inventory/controller"], function () {
    Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {

        Inventory.views.FooterView = Marionette.ItemView.extend({
            template: "footer"
        });

    });
});