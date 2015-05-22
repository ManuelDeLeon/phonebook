if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {
    describe("Contacts", function () {

      it("should be a mongo collection", function () {
        chai.assert.isTrue(Contacts instanceof Mongo.Collection);
      });

      describe("addedHelpers", function () {

        it("should return default image if imageFile is missing", function () {
          var contact = {};
          var imageUrl = Contacts.addedHelpers.imageUrl.apply(contact);
          chai.assert.equal(imageUrl, Global.defaultImage);
        });

        it("should return path to imageFile with version", function () {
          var contact = {
            imageFile: "A",
            imageVersion: "B"
          };
          var imageUrl = Contacts.addedHelpers.imageUrl.apply(contact);
          chai.assert.equal(imageUrl, "/upload/A?v=B");
        });

      });
    });
  });
}