﻿Fleet.module("Main", function (Main, Fleet, Backbone, Marionette, $, _) {

    Main.views.BodyView = Marionette.ItemView.extend({
        template: this.template("body"),
        events: {
            "click #inventory-btn": "inventoryModuleRequested"
        },
        inventoryModuleRequested:function () {
            Fleet.execute("moduleRequested","inventory");
        }
    });

});
