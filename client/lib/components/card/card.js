Template.card.viewmodel({
  // All other properties will be inherited
  category: function(){
    var category = Categories.findOne(this.categoryId());
    return category ? category.name : '';
  },
  imageUrl: function(){
    var contact = Contacts.findOne(this._id());
    return contact && contact.image() || Global.defaultImage;
  }
});
