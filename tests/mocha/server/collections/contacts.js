if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {
    describe("Server.Contacs", function () {

      describe("allow", function () {

        it("should only allow owner insert/update/delete", function () {
          for( var mode in Server.allow.owner) {
            if(mode !== 'fetch') {
              var allowed = Contacts._validators[mode].allow;
              chai.assert.equal(allowed.length, 1);
              chai.assert.equal(String(allowed), String(Server.allow.owner[mode]));
            }
          }
        });

      });

      describe("afterRemove", function () {

        it("should delete file", function () {
          var cache = Server.upload.delete;
          var delId = null;
          var delImageFile = null;
          Server.upload.delete = function(id, fileName) {
            delId = id;
            delImageFile = fileName;
          };
          var afterRemove = Contacts._hookAspects.remove.after[0].aspect;
          afterRemove(null, { _id: "A", imageFile: "B" });

          Server.upload.delete = cache;
          chai.assert.equal(delId, "A");
          chai.assert.equal(delImageFile, "B");
        });

      });

      describe("beforeUpdate", function () {
        var cache = Server.upload.delete;
        var delCalled = false;
        var delArguments = [];
        var beforeUpdate = null;

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
          beforeUpdate = Contacts._hookAspects.update.before[0].aspect;
        });

        it("should not delete without set modifier", function () {
          beforeUpdate(null, null, null, { $set: null }, null);
          chai.assert.isFalse(delCalled);
        });

        it("should not delete without imageFile", function () {
          beforeUpdate(null, { imageFile: null }, null, { $set: { imageFile: "A" } }, null);
          chai.assert.isFalse(delCalled);
        });

        it("should not delete when imageFile == set modifier", function () {
          beforeUpdate(null, { imageFile: "A" }, null, { $set: { imageFile: "A" } }, null);
          chai.assert.isFalse(delCalled);
        });

        it("should delete when imageFile !== set modifier", function () {
          beforeUpdate(null, { imageFile: "B", _id: "X" }, null, { $set: { imageFile: "A" } }, null);
          chai.assert.isTrue(delCalled);
          chai.assert.equal(delArguments[0], "X");
          chai.assert.equal(delArguments[1], "B");
        });

      });

    });
  });
}