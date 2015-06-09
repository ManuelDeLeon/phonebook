if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Categories View Model", function() {

      var vm;

      beforeEach(function() {
        vm = Template.categories.createViewModel();
      });

      it("should have default values", function(){
        chai.assert.equal(vm.newCategory(), '');
        chai.assert.isNull(vm.selected());
      });

      describe("categories", function() {

        it("should find all and sort by name", function () {
          var locator, options;
          var find = Categories.find;
          Categories.find = function(l, o){
            locator = l;
            options = o;
            return "A";
          };
          var result = vm.categories();
          Categories.find = find;
          chai.assert.equal(result, "A");
          chai.assert.isTrue(_.isEqual(locator, {}) );
          chai.assert.isTrue(_.isEqual(options, { sort: { name: 1 } }) );
        });

      });

      describe("addNewCategory", function() {

        it("should not do anything without a newCategory", function () {
          var didInsert = false;
          Categories.insert = function(l, o){
            didInsert = true;
          };
          vm.addNewCategory();
          chai.assert.isFalse( didInsert );
        });

        it("should insert newCategory", function () {
          var insObject;
          Categories.insert = function(o, callback){
            insObject = o;
          };
          vm.newCategory("A");
          vm.addNewCategory();
          chai.assert.isTrue(_.isEqual(insObject, { name: "A" }) );
        });

        it("should show error if insert fails", function () {
          var toasted = false;
          toastr.error = function(){
            toasted = true;
          };
          Categories.insert = function(o, callback){
            callback(true);
          };
          vm.newCategory("A");
          vm.addNewCategory();
          chai.assert.isTrue(toasted);
        });

        it("should select id and clear newCategory", function () {
          Categories.insert = function(o, callback){
            callback(false, "1");
          };
          vm.newCategory("A");
          vm.addNewCategory();
          chai.assert.equal(vm.selected(), "1");
          chai.assert.equal(vm.newCategory(), "");
        });

      });

      describe("addTitle", function() {

        it("should return right title", function () {
          vm.newCategory("A");
          var result = vm.addTitle();
          chai.assert.equal(result, "Add category: A");
        });

      });
    });
  });
}