Template.header.viewmodel('header', {
  searchText: '',
  showSearch: function() {
    return Meteor.userId() && !!ViewModel.byId('contactList');
  }
});