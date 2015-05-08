if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server object", function() {

      var arraysAreEqual = function(a, b) {
        return a.length === b.length && a.every(function(elem, i) {
            return elem === b[i];
          });
      };

      it("should have default properties", function () {
        var baseDir = process.env.PWD || '';
        chai.assert.equal(Server.tempDir, baseDir + '/.uploads/tmp');
        chai.assert.equal(Server.uploadDir, baseDir + '/.uploads');
        chai.assert.isTrue(arraysAreEqual(Server.allowedImageTypes, ['.jpg', '.jpeg', '.png', '.gif']));
      });

      describe("deleteImages", function() {

        it("should call fs.unlink with right file names", function () {
          var deletedFiles = [];
          fs.unlink = function(file) {
            deletedFiles.push(file);
          };
          Server.deleteImages("XYZ");
          chai.assert.equal(deletedFiles.length, 4);
          chai.assert.equal(deletedFiles[0], Server.uploadDir + "/XYZ.jpg");
          chai.assert.equal(deletedFiles[1], Server.uploadDir + "/XYZ.jpeg");
          chai.assert.equal(deletedFiles[2], Server.uploadDir + "/XYZ.png");
          chai.assert.equal(deletedFiles[3], Server.uploadDir + "/XYZ.gif");
        });
      });

      describe("allow.owner", function() {
        var owner = Server.allow.owner;

        describe("insert", function() {

          it("should return false without userId", function () {
            var result = owner.insert(undefined, {});
            chai.assert.notOk(result);
          });

          it("should update document's owner with userId", function () {
            var doc = { owner: "AAA"};
            var result = owner.insert("XYZ", doc);
            chai.assert.ok(result);
            chai.assert.equal(doc.owner, "XYZ");
          });
        });

        describe("update", function() {

          it("should return false if userId doesn't match doc's owner", function () {
            var result = owner.update("1", { owner: "2" });
            chai.assert.notOk(result);
          });

          it("should return true if userId matches doc's owner", function () {
            var result = owner.update("1", { owner: "1" });
            chai.assert.ok(result);
          });
        });

        describe("remove", function() {

          it("should return false if userId doesn't match doc's owner", function () {
            var result = owner.remove("1", { owner: "2" });
            chai.assert.notOk(result);
          });

          it("should return true if userId matches doc's owner", function () {
            var result = owner.remove("1", { owner: "1" });
            chai.assert.ok(result);
          });
        });
      });
    });
  });
}