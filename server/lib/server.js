var baseDir = process.env.PWD || '';
Server = {
  tempDir: baseDir + '/.uploads/tmp',
  uploadDir: baseDir + '/.uploads',
  allowedImageTypes: ['.jpg', '.jpeg', '.png', '.gif'],
  deleteImages: function(id) {
    for (var i = 0, len = Server.allowedImageTypes.length; i < len; i++) {
      var type = Server.allowedImageTypes[i];
      var file = Server.uploadDir + "/" + id + type;
      try {
        fs.unlink(file, function(){});
      } catch (e) {
        // Nothing
      }
    }
  },
  getFileName: function (fileInfo, formData) {
    var name = fileInfo.name;
    Server.deleteImages(formData._id);
    return formData._id + name.substring(name.lastIndexOf("."));
  }
};

Server.allow = {
  owner: {
    insert: function (userId, doc) {
      return (doc.owner = userId);
    },
    update: function (userId, doc, fields, modifier) {
      return doc.owner === userId;
    },
    remove: function (userId, doc) {
      return doc.owner === userId;
    },
    fetch: ['owner']
  }
};