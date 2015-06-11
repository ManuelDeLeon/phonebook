Template.login.viewmodel('login', {
  isNew: true,
  signText: function() {
    return this.isNew() ? 'Sign Up' : 'Sign In';
  },
  name: '',
  nameInvalid: function() {
    return !this.isNew() || !!this.name() ? '' : 'Name is required';
  },
  email: '',
  emailInvalid: function() {
    return Client.validEmail(this.email()) ? '' : 'Valid email is required';
  },
  password: '',
  passwordInvalid: function() {
    return !!this.password() && this.password().length >= 8 ? '' : 'Password must be at least 8 characters long';
  },
  error: function() {
    return this.nameInvalid() || this.emailInvalid() || this.passwordInvalid();
  },
  signHover: false,

  enter: function() {
    if (this.error()) return;

    if (this.isNew()){
      Accounts.createUser({
        email: this.email(),
        password: this.password(),
        profile: {
          name: this.name()
        }
      }, function(err){
        if (err) {
          toastr.error("Could not create your user:<br>" + err.reason);
        }
      })
    } else {
      Meteor.loginWithPassword(this.email(), this.password(), function(err){
        if (err) {
          toastr.error("Could not log you in:<br>" + err.reason);
        }
      });
    }
  }
});