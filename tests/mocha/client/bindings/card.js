if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Card Bindings", function() {

      it("should use imageUrl", function () {
        var bind = Template.card.elementBind("img[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { attr: { src: "imageUrl" } } ));
      });

      it("should use name", function () {
        var bind = Template.card.elementBind("div.header[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { text: "name" }));
      });

      it("should use category", function () {
        var bind = Template.card.elementBind(html.find(".meta span[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { text: "category" }));
      });

      it("should use number", function () {
        var bind = Template.card.elementBind(".call.icon + span[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { text: "number" }));
      });

      it("should use email", function () {
        var bind = Template.card.elementBind(".mail.icon + span[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { text: "email" }));
      });

    });
  });
}