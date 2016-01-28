Template.contactList.viewmodel({
  share: ['search', 'categories'],
  onRendered: function(){
    this.showSearch(true);
  },
  onDestroyed: function(){
    this.showSearch(false);
  },
  searchObject: function () {
    var searchObject = {};
    if (this.searchText()) {
      var r = new RegExp(".*" + this.searchText() + ".*", "i");
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
    var categoryId =  this.selectedCategory();
    if (categoryId){
      find.categoryId = categoryId;
    }
    return Contacts.find(find, { sort: { name: 1 } } );
  }
});
