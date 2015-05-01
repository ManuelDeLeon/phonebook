Template.card.viewmodel({
  imageProgress: null,
  onRendered: function (t) {
    var vm = t.viewmodel;
    Images.resumable.assignDrop( t.$(".grid.middle") );

    Images.resumable.on('fileAdded', function(file) {
      vm.imageProgress(0);
      return Images.insert({
        _id: file.uniqueIdentifier,
        filename: file.fileName,
        contentType: file.file.type
      }, function(err, _id) {
        if (err) {
          console.warn("File creation failed!", err);
          return;
        }
        return Images.resumable.upload();
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
})