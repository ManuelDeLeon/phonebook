var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

ViewModel.mixin({
  user: {
    hasUser: function() {
      return !!Meteor.userId() || Meteor.loggingIn();
    }
  },
  email: {
    validEmail: function(email){
      return !!email && emailRegex.test(email);
    }
  }
})