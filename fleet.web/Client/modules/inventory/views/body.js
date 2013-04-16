//define(["modules/inventory/controller"], function () {
    Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {
        Inventory.views.BodyView = Inventory.baseViews.ItemView.extend({
            template: "body",
            //getTemplate:function () {
            //    return this.module.prefix + Marionette.getOption(this, "template");
            //    //return Marionette.getOption(this, "template");
            //}   
        });

    });
//});


    //My.CoolView = Marionette.ItemView.extend({
    //   getTemplate :function () {
    //       return templatePrefix + Marionette.getOption(this, "template");
    //   }
    //});
    
    //App.module("moduleA", function(moduleA, App, Backbone, Marionette, $, _) {
    //    this.templatePrefix = 'bar';

    //    this.someView = My.CoolView.extend({
    //        template: "some-template"
    //    });
    //});   
    
    //App.module("moduleB", function(moduleB, App, Backbone, Marionette, $, _) {
    //    this.templatePrefix = 'baz';

    //    this.someView = My.CoolView.extend({
    //        template: "some-template"
    //    });
    //});