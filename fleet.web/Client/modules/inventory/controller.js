// define base module elements; other module files may depend
// on this, but it must not depend on any other module files
Fleet.module("Inventory", function (Inventory) {
        Inventory.views = {};
    });


// define the controller last. generally, it should depend on all
// module files, otherwise they will not get loaded
define([
        "modules/inventory/views/header",
        "modules/inventory/views/footer"
    ],
    function() {
        Fleet.module("Inventory", function(Inventory, Fleet, Backbone, Marionette, $, _) {
            Fleet.addInitializer(function() {
                Fleet.Inventory.headerView = new Fleet.Inventory.views.HeaderView();
                Fleet.Inventory.footerView = new Fleet.Inventory.views.FooterView();
                $("h1").html('Fleet module is started');
            });
        });
    });
    
