﻿Fleet.module("Main", function(Main, Fleet, Backbone, Marionette, $, _) {
    Main.views.HeaderView = Marionette.ItemView.extend({
        template: this.template("header"),
        tagName: "div",
        className:"well well-small"
    });

});