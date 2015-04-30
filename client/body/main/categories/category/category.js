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
      Client.alert({
        header: "Are you sure you want to delete this category?",
        description: "Description",
        image: "trash",
        onApprove: function(){ console.log("OK"); }
      }
  }
);