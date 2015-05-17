var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

Client = {
  alert: function(data) {
    Blaze.renderWithData(Template.alert, data, document.body);
  },
  validEmail: function(email){
    return !!email && emailRegex.test(email);
  },
  categoryId: function(){
    var categories = ViewModel.byId("categories");
    return categories && categories.selected();
  },
  contactId: function(){
    var contacts = ViewModel.byId("contacts");
    return contacts && contacts.selected();
  },
  searchText: function () {
    var header = ViewModel.byId("header");
    return header && header.searchText();
  }
};
