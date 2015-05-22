if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Card Bindings", function() {
      var html = $("<div></div>").append($(Blaze.toHTML(Template.card)));

      it("should use imageUrl", function () {
        var bind = ViewModel.parseBind(html.find("img[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { attr: { src: "imageUrl" } } ));
      });

      it("should use name", function () {
        var bind = ViewModel.parseBind(html.find("div.header[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { text: "name" }));
      });

      it("should use category", function () {
        var bind = ViewModel.parseBind(html.find(".meta span[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { text: "category" }));
      });

      it("should use number", function () {
        var bind = ViewModel.parseBind(html.find(".call.icon + span[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { text: "number" }));
      });

      it("should use email", function () {
        var bind = ViewModel.parseBind(html.find(".mail.icon + span[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { text: "email" }));
      });
    });
  });
}