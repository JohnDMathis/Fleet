define(["modules/main/controller"], function () {
    Fleet.module("Main", function (Main, Fleet, Backbone, Marionette, $, _) {

        Main.views.HeaderView = Main.baseViews.ItemView.extend({
            template: "header"
        });
        
    });
});