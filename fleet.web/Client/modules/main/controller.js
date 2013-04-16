Fleet.module("Main", function(Main, Fleet, Backbone, Marionette, $, _) {

    this.show = function() {
        this.headerView = new this.views.HeaderView();
        this.footerView = new this.views.FooterView();
        this.bodyView = new this.views.BodyView();
        
        Fleet.header.show(this.headerView);
        Fleet.body1.show(this.bodyView);
        Fleet.footer.show(this.footerView);
    };

});