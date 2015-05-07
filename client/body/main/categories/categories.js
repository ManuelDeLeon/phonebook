Template.categories.viewmodel('categories', {
  categories: function() {
    return Categories.find();
  },
  newCategory: '',
  addNewCategory: function() {
    var self = this;
    if (!self.newCategory()) return;
    Categories.insert({ name: this.newCategory() }, function(err, id) {
      self.selected(id);
      self.newCategory('');
    });
  },
  selected: null,
  showAll: function() {
    if (this.selected() && !Categories.findOne(this.selected())) {
      this.selected(null);
    }
    return !this.selected() ;
  },
  addTitle: function() {
    return "Add category: " + this.newCategory();
  }
}, 'categories');