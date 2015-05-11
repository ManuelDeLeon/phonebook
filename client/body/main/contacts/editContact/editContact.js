var cardViewModel = {
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
    var categoryId = this.editVM() && this.editVM().categoryId()
    var category = Categories.findOne(categoryId);
    return category ? category.name : '';
  },
  imageUrl: function(){
    var contact = Contacts.findOne(this._id());
    return contact && contact.imageUrl() || Global.defaultImage;
  }
};

Template.editContact.viewmodel('editContact',
  {
    cardViewModel: function() {
      return cardViewModel;
    },
    uploaderEvents: function() {
      return {
        finished: function (index, fileInfo, templateContext) {
          var id = templateContext.data.formData._id;
          Contacts.update( id, { $set: { imageFile: fileInfo.name }, $inc: { imageVersion: 1 } }, function(err) {
            if (err) {
              toastr.error("Could not update contact:<br>" + err.reason);
            }
          });
        }
      };
    },
    uploaderData: function() {
      return {
        _id: this.editId()
      };
    },
    editId: function () {
      var vm = ViewModel.byId("editContactForm");
      return vm && vm._id();
    }
  },
  ['uploaderEvents', 'uploaderData', 'editId', 'cardViewModel']
)