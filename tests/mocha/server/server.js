if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server", function() {

      var arraysAreEqual = function(a, b) {
        return a.length === b.length && a.every(function(elem, i) {
            return elem === b[i];
          });
      };

      describe("upload", function() {
        var upload = Server.upload;
        var deleteMaxRetries = upload.deleteMaxRetries;
        var deleteRetriesDelay = upload.deleteRetriesDelay;
        var init = upload.init;

        beforeEach(function() {
          upload.deleteMaxRetries = deleteMaxRetries;
          upload.deleteRetriesDelay = deleteRetriesDelay;
        });

        it("should have default properties", function () {
          chai.assert.equal(upload.deleteMaxRetries, 3);
          chai.assert.equal(upload.deleteRetriesDelay, 60000);
        });

        describe("init", function() {

          it("should have default properties", function () {
            var baseDir = process.env.PWD || '';
            chai.assert.equal(init.tmpDir, baseDir + '/.uploads/tmp');
            chai.assert.equal(init.uploadDir, baseDir + '/.uploads');
            chai.assert.equal(init.checkCreateDirectories, true);
            chai.assert.equal(init.maxFileSize, 2000000);
            chai.assert.equal(init.acceptFileTypes.toString(), (/.(gif|jpe?g|png)$/i).toString());
          });

          describe("getFileName", function() {

            it("should return formData._id + file extension", function () {
              var fileInfo = { name: "B.xyz" }
              var formData = { _id: "A" };
              var fileName = Server.upload.init.getFileName(fileInfo, formData);
              chai.assert.equal(fileName, "A.xyz");
            });
          });
        });

        describe("delete", function() {
          it("should call fs.unlink with right file name", function () {
            var deletedFiles = [];
            fs.unlink = function(file) {
              deletedFiles.push(file);
            };
            upload.delete("XYZ", "XYZ.jpg");
            chai.assert.equal(deletedFiles.length, 1);
            chai.assert.equal(deletedFiles[0], init.uploadDir + "/XYZ.jpg");
          });

          it("should retry if fs.unlink fails", function (done) {
            Email.send = function() {};
            var deletedFiles = [];
            fs.unlink = function(file, callback) {
              deletedFiles.push(file);
              callback("error");
            };
            upload.deleteMaxRetries = 1;
            upload.deleteRetriesDelay = 0;
            upload.delete("XYZ", "XYZ.jpg");
            chai.assert.equal(deletedFiles.length, 1);
            chai.assert.equal(deletedFiles[0], init.uploadDir + "/XYZ.jpg");
            Global.delay(100, function(){
              chai.assert.equal(deletedFiles.length, 2);
              chai.assert.equal(deletedFiles[0], init.uploadDir + "/XYZ.jpg");
              chai.assert.equal(deletedFiles[1], init.uploadDir + "/XYZ.jpg");
              done();
            });
          });

          it("should not call fs.unlink or send email if there is a contact", function (done) {
            var calledEmail = false;
            var calledUnlink = false;

            Email.send = function() {
              calledEmail = true;
            };
            fs.unlink = function() {
              calledUnlink = true;
            };

            Contacts.findOne = function() {
              return {};
            };
            upload.deleteMaxRetries = 1;
            upload.deleteRetriesDelay = 0;

            upload.delete("XYZ", "XYZ.jpg");
            Global.delay(100, function(){
              chai.assert.isFalse(calledEmail);
              chai.assert.isFalse(calledUnlink);
              done();
            });

          });
        });
      });

      describe("allow.owner", function() {
        var owner = Server.allow.owner;

        describe("insert", function() {

          it("should return false without userId", function () {
            var result = owner.insert(undefined, { owner: "A" });
            chai.assert.notOk(result);
          });

          it("should return false if userId != document owner", function () {
            var result = owner.insert("B", { owner: "A" });
            chai.assert.notOk(result);
          });

          it("should return true if userId == document owner", function () {
            var result = owner.insert("A", { owner: "A" });
            chai.assert.ok(result);
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