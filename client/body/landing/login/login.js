var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

Template.login.viewmodel({
  isNew: true,
  signText: function() {
    if (this.isNew()) return 'Sign Up';
    return 'Sign In';
  },
  name: '',
  nameInvalid: function() {
    return !this.isNew() || !!this.name() ? '' : 'Name is required';
  },
  email: '',
  emailInvalid: function() {
    return !!this.email() && emailRegex.test(this.email()) ? '' : 'Valid email is required';
  },
  password: '',
  passwordInvalid: function() {
    return !!this.password() && this.password().length >= 8 ? '' : 'Password must be at least 8 characters long';
  },
  error: function() {
    return this.nameInvalid() || this.emailInvalid() || this.passwordInvalid();
  },
  signHover: false
})