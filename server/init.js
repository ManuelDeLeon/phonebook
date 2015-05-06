Meteor.startup(function () {
  UploadServer.init({
    tmpDir: Server.tempDir,
    uploadDir: Server.uploadDir,
    checkCreateDirectories: true,
    maxFileSize: 2000000,
    acceptFileTypes: /.(gif|jpe?g|png)$/i,
    getFileName: function (fileInfo, formData) {
      var name = fileInfo.name;
      Server.deleteImages(formData._id);
      return formData._id + name.substring(name.lastIndexOf("."));
    }
  })
});