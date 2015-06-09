if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Header Bindings", function() {
      Meteor.loggingIn = function() { return true; };

      it("should use searchText on input box", function () {
        var bind = Template.header.elementBind("input[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { value: "searchText", delay: "400" }));
      });

      it("should use searchText on search icon", function () {
        var bind = Template.header.elementBind("i.search[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { if: "!searchText" }));
      });

      it("should use searchText on remove icon", function () {
        var bind = Template.header.elementBind("i.remove[data-bind]");
        chai.assert.isTrue(_.isEqual(bind, { if: "searchText", click: "searchText('')" }));
      });

    });
  });
}