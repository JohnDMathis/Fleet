define(["modules/inventory/controller"], function () {
    Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {

        Inventory.views.HeaderView = Marionette.ItemView.extend({
            template: "header"
        });
        
    });
});