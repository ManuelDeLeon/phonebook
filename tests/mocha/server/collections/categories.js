if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {
    describe("Server.Categories", function () {

      describe("allow", function () {

        it("should only allow owner insert/update/delete", function () {
          for( var mode in Server.allow.owner) {
            if(mode !== 'fetch') {
              var allowed = Categories._validators[mode].allow;
              chai.assert.equal(allowed.length, 1);
              chai.assert.equal(String(allowed), String(Server.allow.owner[mode]));
            }
          }
        });

      });

      describe("afterRemove", function () {

        it("should remove contact", function () {
          var docRemoved = false;
          var remove = Contacts.remove;
          Contacts.remove = function(doc) {
            docRemoved = doc;
          };
          var afterRemove = Categories._hookAspects.remove.after[0].aspect;
          afterRemove(null, { _id: "A" });
          Contacts.remove = remove;
          chai.assert.isTrue(_.isEqual(docRemoved, { categoryId: "A" }));
        });

      });

    });
  });
}