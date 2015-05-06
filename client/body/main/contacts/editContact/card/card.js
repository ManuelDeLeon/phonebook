Card = {}
Card.editViewModel = {
  editVM: function(){
    return ViewModel.byId("editContactForm");
  },
  _id: function(){
    return this.editVM() && this.editVM()._id();
  },
  name: function(){
    return this.editVM() && this.editVM().name();
  },
  number: function(){
    return this.editVM() && this.editVM().number();
  },
  email: function(){
    return this.editVM() && this.editVM().email();
  },
  category: function(){
    categoryId = this.editVM() && this.editVM().categoryId()
    var category = Categories.findOne(categoryId);
    return category ? category.name : '';
  },
  image: function(){
    var contact = Contacts.findOne(this._id());
    if (contact){
      return contact.image + "?v=" + contact.imageVersion;
    } else {
      return Client.defaultImage;
    }

  }
}

Card.readViewModel = {
  name: 'x',
  number: '',
  email: '',
  category: ''
}

Template.card.viewmodel(
  function(vm){
    return vm;
  }
);
