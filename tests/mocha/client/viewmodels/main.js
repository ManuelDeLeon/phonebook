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

      describe("onCreated", function() {
        it("should subscribe to 'main' and set mainReady", function () {
          var calledMain = false;
          var template = {
            subscribe: function(name, callback){
              if (name === 'main') {
                calledMain = true;
              }
              Client.subscriptions.mainReady = false;
              callback();
            }
          };
          vm.onCreated(template);
          chai.assert.isTrue(calledMain);
          chai.assert.isTrue(Client.subscriptions.mainReady);
        });

      });

    });
  });
}