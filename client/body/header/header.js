Template.header.viewmodel('header', {
  searchText: '',
  hasUser: function(){
    return Client.hasUser();
  }
}, 'hasUser');