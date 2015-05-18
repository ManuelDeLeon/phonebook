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
  maxDelRetries: 3,
  delete: function(id, fileName, tryCount) {
    if (tryCount <= Server.upload.maxDelRetries) {
      if (! Contacts.findOne(id)) {
        var file = Server.upload.init.uploadDir + "/" + fileName;
        fs.unlink(file, function (err) {
          if (err) {
            Meteor.setTimeout(function () {
              Server.upload.delete(id, fileName, tryCount + 1);
            }, 60000)
          }
        });
      }
    } else {
      Email.send({
        from: 'phonebookApp@example.com',
        to: 'phonebookAdmins@example.com',
        subject: 'Error deleting image ' + fileName,
        text: 'id: ' + id + ' - fileName: ' + fileName
      });
    }
  }
}