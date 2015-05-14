Template.main.viewmodel('main', {
  onCreated: function(template) {
    template.subscribe('main', function() {
      Client.subscriptions.mainReady = true;
    });
  },
  hasCategories: function () {
    return !!Categories.findOne();
  }
});
