log('inventory');
// frist module definition file; it can not depend on any other module files
Fleet.module("Inventory", function (Inventory) {
    log('inventory module def');
    Inventory.views = {};
});
