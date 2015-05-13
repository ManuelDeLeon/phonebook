if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Main Bindings", function() {
      var html = $("<div></div>").append($(Blaze.toHTML(Template.main)));

      it("should use hasCategories", function () {
        var bind = ViewModel.parseBind(html.find("div[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { if: "hasCategories" }));
      });
    });
  });
}