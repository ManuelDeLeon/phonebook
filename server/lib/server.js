var baseDir = process.env.PWD || '';
Server = {

};

Server.allow = {
  owner: {
    insert: function (userId, doc) {
      console.log("insert");
      console.log(doc);
      return doc.owner = userId;
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

Server.upload = {
  init: {
    tmpDir: baseDir + '/.uploads/tmp',
    uploadDir: baseDir + '/.uploads',
    checkCreateDirectories: true,
    maxFileSize: 2000000,
    acceptFileTypes: /.(gif|jpe?g|png)$/i,
    getFileName: function (fileInfo, formData) {
      var name = fileInfo.name;
      var ext = name.substring(name.lastIndexOf(".")).toLowerCase();
      return formData._id + ext;
    }
  },
  delete: function(fileName) {
    var file = Server.upload.init.uploadDir + "/" + fileName;
    try {
      fs.unlink(file, function () {
        // Nothing
      });
    } catch (e) {
      // Nothing
    }
  }
}