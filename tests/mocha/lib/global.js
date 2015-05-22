if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {
    describe("Global", function () {

      it("should have default properties", function () {
        chai.assert.equal(Global.defaultImage, '/images/user.png');
      });

    });
  });
}