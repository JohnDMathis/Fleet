Fleet.module("Inventory", function(Inventory, Fleet, Backbone, Marionette, $, _) {

    this.show = function() {
        var bodyModel = new Backbone.Model({ message: "Inventory module body view" });
        this.bodyView = new this.views.BodyView({ model: bodyModel });

        Fleet.body2.show(this.bodyView);
    };
});
