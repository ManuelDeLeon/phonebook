var baseDir = process.env.PWD || '';

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