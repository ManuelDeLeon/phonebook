Template.contactRow.viewmodel(
  function(data) {
    return data;
  },
  {
    rowHover: false,
    rowClick: function() {
      var vm = ViewModel.byId("contacts");
      vm.selected(this._id());
      vm.editMode(true);
    },
    category: function() {
      var cat = Categories.findOne(this.categoryId())
      return cat && cat.name;
    }
  }
);