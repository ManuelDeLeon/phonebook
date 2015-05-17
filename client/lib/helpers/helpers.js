UI.registerHelper("hasUser", function () {
  return !!Meteor.userId() || Meteor.loggingIn();
});