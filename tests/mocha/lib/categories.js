if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {
    describe("Categories", function () {

      it("should be a mongo collection", function () {
        chai.assert.isTrue(Categories instanceof Mongo.Collection);
      });

    });
  });
}