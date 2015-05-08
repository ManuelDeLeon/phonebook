Template.main.viewmodel({
  onCreated: function(template) {
    template.subscribe('main');
  },
  hasCategories: function () {
    return Categories.findOne();
  }
});
