if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {
    describe("Server.Contacs", function () {

      describe("afterRemove", function () {

        it("should delete file", function () {
          var cache = Server.upload.delete;
          var delId = null;
          var delImageFile = null;
          Server.upload.delete = function(id, fileName) {
            delId = id;
            delImageFile = fileName;
          };
          Contacts.afterRemove(null, { _id: "A", imageFile: "B" });

          Server.upload.delete = cache;
          chai.assert.equal(delId, "A");
          chai.assert.equal(delImageFile, "B");
        });

      });

      describe("beforeUpdate", function () {
        var cache = Server.upload.delete;
        var delCalled = false;
        var delArguments = [];

        beforeEach(function() {
          delCalled = false;
          delArguments = [];

        });
        after(function() {
          Server.upload.delete = cache;
        });
        before(function() {
          Server.upload.delete = function(){
            delCalled = true;
            delArguments = _.toArray(arguments);
          };
        });

        it("should not delete without set modifier", function () {
          Contacts.beforeUpdate(null, null, null, { $set: null }, null);
          chai.assert.isFalse(delCalled);
        });

        it("should not delete without imageFile", function () {
          Contacts.beforeUpdate(null, { imageFile: null }, null, { $set: { imageFile: "A" } }, null);
          chai.assert.isFalse(delCalled);
        });

        it("should not delete when imageFile == set modifier", function () {
          Contacts.beforeUpdate(null, { imageFile: "A" }, null, { $set: { imageFile: "A" } }, null);
          chai.assert.isFalse(delCalled);
        });

        it("should delete when imageFile !== set modifier", function () {
          Contacts.beforeUpdate(null, { imageFile: "B", _id: "X" }, null, { $set: { imageFile: "A" } }, null);
          chai.assert.isTrue(delCalled);
          chai.assert.equal(delArguments[0], "X");
          chai.assert.equal(delArguments[1], "B");
        });

      });

    });
  });
}