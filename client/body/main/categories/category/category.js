Template.category.viewmodel(
  function(category){
    // Add all properties in the category to this view model
    return category;
  },
  {
    hovering: false,
    isActive: function() {
      return this.parent().selected() === this._id();
    },
    select: function() {
      this.parent().selected(this._id());
    },
    delete: function() {
      var self = this;
      Client.alert({
        header: "Are you sure you want to delete category '" + self.name() + "'?",
        description: "You're about to delete category '" + self.name() + "'. This will delete all contacts in this category. Do you want to delete it?",
        image: "trash",
        onApprove: function () {
          self.parent().selected(null);
          Categories.remove(self._id());
        }
      });
    }
  }
);