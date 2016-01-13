ViewModel.mixin
  user:
    hasUser: -> !!Meteor.userId() or Meteor.loggingIn()