log('controller');


require([
        "modules/inventory/inventory",
        "modules/inventory/views/header"
//        "modules/inventory/views/footer"
    ],
    function() {
        log('controller require callback');
        Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {
            log('controller module def');
            Fleet.addInitializer(function () {
                log('Fleet module ready');
                Fleet.Inventory.headerView = new Fleet.Inventory.views.HeaderView();
                $("h1").html('Fleet module is started');
            });
        });
    });
    
//Fleet.module("Inventory", function (Inventory, Fleet, Backbone, Marionette, $, _) {
//    Fleet.addInitializer(function () {
//        log('Fleet module ready');
//        $("h1").html('Fleet module is started');
//        Inventory.headerView = new Inventory.views.HeaderView();
        
//    });
//});
