Template.contactList.viewmodel({
  searchObject: function () {
    var header = ViewModel.byId("header");
    if (header && header.searchText()) {
      var r = new RegExp(".*" + header.searchText() + ".*", "i");
      return {
        $or: [
          { name: r },
          { email: r }
        ]
      };
    }
    return {};
  },
  contacts: function() {
    var find = this.searchObject();
    var categories = ViewModel.byId("categories");
    var categoryId =  categories && categories.selected();
    if (categoryId){
      find.categoryId = categoryId;
    }
    return Contacts.find(find);
  }
}, 'contacts');