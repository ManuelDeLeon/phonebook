Template.contactList.viewmodel({
  contacts: function() {
    var categories = ViewModel.byId("categories");
    var categoryId =  categories && categories.selected();
    var find = categoryId && { categoryId: categoryId } || {};

    return Contacts.find(find);
  }
}, 'contacts')