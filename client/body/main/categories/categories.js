Template.categories.viewmodel('categories', {
  categories: function() {
    return Categories.find( {}, { sort: { name: 1 } } );
  },
  newCategory: '',
  addNewCategory: function() {
    var self = this;
    if (!self.newCategory()) return;
    Categories.insert({ name: this.newCategory() }, function(err, id) {
        if (err) {
          toastr.error("Could not update contact: <br>" + err.reason);
        } else {
          self.selected(id);
          self.newCategory('');
        }
    });
  },
  selected: null,
  autorun: function() {
    if (this.selected() && Client.subscriptions.mainReady && !Categories.findOne(this.selected())) {
      this.selected(null);
    }
  },
  addTitle: function() {
    return "Add category: " + this.newCategory();
  },
  onUrl: 'selected'
}, 'categories');