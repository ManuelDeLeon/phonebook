Template.contactList.viewmodel('contactList', {
  searchObject: function () {
    var searchObject = {};
    var searchText = Client.viewmodelValue('header', 'searchText');
    if (searchText) {
      var r = new RegExp(".*" + searchText + ".*", "i");
      searchObject['$or'] =
        [
          { name: r },
          { email: r }
        ]
      ;
    }
    return searchObject;
  },
  contacts: function() {
    var find = this.searchObject();
    var categoryId =  Client.viewmodelValue('categories', 'selected');
    if (categoryId){
      find.categoryId = categoryId;
    }
    return Contacts.find(find, { sort: { name: 1 } } );
  }
}, 'contacts');