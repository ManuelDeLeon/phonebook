Template.main.onCreated(function() {
  this.subscribe('main');
  $.cookie( 'X-Auth-Token', Accounts._storedLoginToken());
})