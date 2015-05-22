if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Card View Model", function() {

      it("should use object passed in constructor", function () {
        var obj = {
          a: "A",
          b: 1
        };
        var vm = Template.card.createViewModel(obj);
        chai.assert.isTrue(_.isEqual(vm.toJS(), obj) );
      });

    });
  });
}