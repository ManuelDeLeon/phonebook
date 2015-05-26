if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {
    describe("Server.Categories", function () {

      describe("afterRemove", function () {

        it("should remove contact", function () {
          var docRemoved = false;
          Contacts.remove = function(doc) {
            docRemoved = doc;
          };
          Categories.afterRemove(null, { _id: "A" });
          chai.assert.isTrue(_.isEqual(docRemoved, { categoryId: "A" }));
        });

      });

    });
  });
}