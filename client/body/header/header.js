Template.header.viewmodel('header', {
  searchText: '',
  userId: function() {
    return Meteor.userId();
  }
});