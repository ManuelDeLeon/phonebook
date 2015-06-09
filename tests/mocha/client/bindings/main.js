if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Main Bindings", function() {

      it("should use hasCategories", function () {
        var bind = Template.main.elementBind("div[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { if: "hasCategories" }));
      });

    });
  });
}