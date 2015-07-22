Template.main.viewmodel('main',
  {
    selectedCategory: null,
    onCreated: function(template) {
      template.subscribe('main', function() {
        Client.subscriptions.mainReady = true;
      });
    },
    hasCategories: function () {
      return !!Categories.findOne();
    },
    context: function() {
      return {
        selectedCategory: this.selectedCategory
      }
    }
  },
  'context'
);
