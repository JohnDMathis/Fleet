Fleet.module("Main", function (Main, Fleet, Backbone, Marionette, $, _) {

    Main.prefix = "main";
    Main.templatePath = "client/modules/main/templates/";
    Main.views = {};
    Main.template = function (str) {
        return Main.prefix + '-' + str;
    };

    Fleet.addInitializer(function () {
        // load templates for this module
        Marionette.ModuleHelper.loadModuleTemplates(Main, Main.show);
    });

    // controller
    this.show = function () {
        this.headerView = new this.views.HeaderView();
        this.footerView = new this.views.FooterView();
        this.bodyView = new this.views.BodyView();

        Fleet.header.show(this.headerView);
        Fleet.body1.show(this.bodyView);
        Fleet.footer.show(this.footerView);
    };

    this.onTemplatesLoaded = function () {
        this.show();
    };

    // header
    Main.views.HeaderView = Marionette.ItemView.extend({
        template: this.template("header"),
        tagName: "div",
        className: "well well-small"
    });

    // footer
    Main.views.FooterView = Marionette.ItemView.extend({
        template: this.template("footer")
    });

    // body
    Main.views.BodyView = Marionette.ItemView.extend({
        className: "well well-small",
        template: this.template("body"),
        events: {
            "click #inventory-btn": "inventoryModuleRequested"
        },
        inventoryModuleRequested: function () {
            Fleet.execute("inventoryModuleRequested");
        }
    });

    // templates
    (function () { var a = Handlebars.template, b = Handlebars.main = Handlebars.main || {}; b["body.html"] = a(function (a, b, c, d, e) { return this.compilerInfo = [2, ">= 1.0.0-rc.3"], c = c || a.helpers, e = e || {}, '﻿This is the body of the main module\r\n<div>\r\n    <div id="inventory-btn" class="btn btn-primary">Load Inventory Module</div>\r\n</div>' }), b["footer.html"] = a(function (a, b, c, d, e) { return this.compilerInfo = [2, ">= 1.0.0-rc.3"], c = c || a.helpers, e = e || {}, "﻿<h3>Main Footer</h3>" }), b["header.html"] = a(function (a, b, c, d, e) { return this.compilerInfo = [2, ">= 1.0.0-rc.3"], c = c || a.helpers, e = e || {}, "﻿<h2>Main Header</h2>\r\n" }) })();

});

