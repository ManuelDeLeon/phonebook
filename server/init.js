Meteor.startup(function () {
  UploadServer.init(Server.upload.init);
});