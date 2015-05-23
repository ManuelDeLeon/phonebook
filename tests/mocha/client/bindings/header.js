if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Header Bindings", function() {
      Meteor.loggingIn = function() { return true; };
      var html = $("<div></div>").append($(Blaze.toHTML(Template.header)));

      it("should use searchText on input box", function () {
        var bind = ViewModel.parseBind(html.find("input[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { value: "searchText", delay: "400" }));
      });

      it("should use searchText on search icon", function () {
        var bind = ViewModel.parseBind(html.find("i.search[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { if: "!searchText" }));
      });

      it("should use searchText on remove icon", function () {
        var bind = ViewModel.parseBind(html.find("i.remove[data-bind]").data("bind"));
        chai.assert.isTrue(_.isEqual(bind, { if: "searchText", click: "searchText('')" }));
      });

    });
  });
}