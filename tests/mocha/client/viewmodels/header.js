if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Header View Model", function(){

      it("should have default values", function(){
        var vm = Template.header.createViewModel();
        chai.assert.equal(vm.searchText(), '');
      });

    });
  });
}
