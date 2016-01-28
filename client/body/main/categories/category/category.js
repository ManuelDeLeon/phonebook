Template.category.viewmodel({
  share: 'categories',
  delete: function() {
    var self = this;
    Client.alert({
      header: "Are you sure you want to delete category '" + self.name() + "'?",
      description: "You're about to delete category '" + self.name() + "'. This will delete all contacts in this category. Do you want to delete it?",
      image: "trash",
      onApprove: function () {
        Categories.remove(self._id());
        self.selectedCategory(null);
      }
    });
  }
});