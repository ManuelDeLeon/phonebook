if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Category View Model", function() {

      var vm;

      beforeEach(function() {
        var _value = '';
        vm = Template.category.createViewModel({
          _id: 'A',
          name: 'Alan',
          parent: function () {
            return {
              selected: function (value) {
                if (value) {
                  _value = value;
                }
                return _value;
              }
            }
          }
        });
      });

      it("should have default values", function(){
        chai.assert.isFalse(vm.hovering());
        // Added by constructor
        chai.assert.equal(vm._id(), 'A');
        chai.assert.equal(vm.name(), 'Alan');
        chai.assert.equal(vm.parent().selected(), '')
      });

      describe("isActive", function() {

        it("should return false if _id != parent.selected", function () {
          vm.parent().selected('B');
          chai.assert.isFalse(vm.isActive())
        });

        it("should return true if _id == parent.selected", function () {
          vm.parent().selected('A');
          chai.assert.isTrue(vm.isActive())
        });

      });

      describe("select", function() {
        it("should set parent.selected with this._id", function () {
          vm.select();
          chai.assert.equal(vm.parent().selected(), vm._id())
        });
      });

      describe("delete", function() {
        it("should call Client.alert with onApprove", function () {
          var remove = Categories.remove;
          var idRemoved = null;
          Categories.remove = function(id){
            idRemoved = id;
          };
          var alert = Client.alert;
          Client.alert = function(obj){
            obj.onApprove();
          };
          vm.delete();
          Categories.remove = remove;
          Client.alert = alert;
          chai.assert.equal(idRemoved, 'A')
        });
      });

    });
  });
}