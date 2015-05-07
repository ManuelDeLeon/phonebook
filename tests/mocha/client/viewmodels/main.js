if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Main View Model", function() {
      var vm;
      beforeEach(function () {
        vm = Template.main.createViewModel();
      });
      describe("hasCategories", function() {
        it("should return false when Categories is empty", function () {
          Categories.findOne = function() { return undefined; };
          chai.assert.notOk(vm.hasCategories());
        });
        it("should return true when Categories is not empty", function () {
          Categories.findOne = function() { return {}; };
          chai.assert.ok(vm.hasCategories());
        });
      });
    });
  });
}