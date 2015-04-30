Template.body.helpers({
  hasUser: function(){
    return Meteor.userId() || Meteor.loggingIn();
  }
});