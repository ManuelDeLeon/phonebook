if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {
    describe("Server.Categories", function () {

      describe("afterRemove", function () {

        it("should remove contact", function () {
          var docRemoved = false;
          var remove = Contacts.remove;
          console.log(Contacts._hookAspects.remove.after[0].aspect);
          Contacts.remove = function(doc) {
            docRemoved = doc;
          };
          //Categories.afterRemove(null, { _id: "A" });
          var afterRemove = Contacts._hookAspects.remove.after[0].aspect;
          afterRemove(null, { _id: "A" });
          Contacts.remove = remove;
          chai.assert.isTrue(_.isEqual(docRemoved, { categoryId: "A" }));
        });

      });

    });
  });
}