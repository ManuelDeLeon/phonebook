Template.contactList.viewmodel('contactList',
  function(context){
    return context;
  },
  {
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
      var categoryId =  this.selectedCategory(); // Ta-dah!!!
      if (categoryId){
        find.categoryId = categoryId;
      }
      return Contacts.find(find, { sort: { name: 1 } } );
    }
  },
  'contacts'
);