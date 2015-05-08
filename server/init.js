Meteor.startup(function () {
  UploadServer.init({
    tmpDir: Server.tempDir,
    uploadDir: Server.uploadDir,
    checkCreateDirectories: true,
    maxFileSize: 2000000,
    acceptFileTypes: /.(gif|jpe?g|png)$/i,
    getFileName: Server.getFileName
  })
});