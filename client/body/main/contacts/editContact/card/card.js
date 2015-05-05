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
  },
  {
    imageProgress: null,
    onRendered: function (t) {
      var vm = t.viewmodel;
      Images.resumable.assignDrop( t.$(".grid.middle") );

      Images.resumable.on('fileAdded', function(file) {
        vm.imageProgress(0);

        Images.insert({
          //_id: file.uniqueIdentifier,
          filename: file.fileName,
          contentType: file.file.type
        }, function(err, _id) {
          if (err) {
            console.warn("File creation failed!", err);
          } else {
            var md5 = Images.findOne(_id).md5
            Contacts.update(vm._id(), { $set: { image: Images.baseURL + "/" + md5 }})
            Images.resumable.upload();
          }
        });
      });

      Images.resumable.on('fileProgress', function(file) {
        vm.imageProgress(Math.floor(100 * file.progress()));
      });

      Images.resumable.on('fileSuccess', function(file) {
        vm.imageProgress(null);
      });

      Images.resumable.on('fileError', function(file) {
        console.warn("Error uploading", file.uniqueIdentifier);
        vm.imageProgress(null);
      });
    }
  }
);

//Template.card.viewmodel({
//  imageProgress: null,
//  onRendered: function (t) {
//    var vm = t.viewmodel;
//    Images.resumable.assignDrop( t.$(".grid.middle") );
//
//    Images.resumable.on('fileAdded', function(file) {
//      vm.imageProgress(0);
//      return Images.insert({
//        _id: file.uniqueIdentifier,
//        filename: file.fileName,
//        contentType: file.file.type
//      }, function(err, _id) {
//        if (err) {
//          console.warn("File creation failed!", err);
//          return;
//        }
//        return Images.resumable.upload();
//      });
//    });
//
//    Images.resumable.on('fileProgress', function(file) {
//      vm.imageProgress(Math.floor(100 * file.progress()));
//    });
//
//    Images.resumable.on('fileSuccess', function(file) {
//      vm.imageProgress(null);
//    });
//
//    Images.resumable.on('fileError', function(file) {
//      console.warn("Error uploading", file.uniqueIdentifier);
//      vm.imageProgress(null);
//    });
//  }
//})