Template.categories.viewmodel('categories', {
  categories: function() {
    return Categories.find();
  },
  newCategory: '',
  addNewCategory: function() {
    self = this;
    if (!self.newCategory()) return;
    Categories.insert({ name: this.newCategory() }, function(err, id) {
      self.selected(id);
    });
    this.newCategory('');
  },
  selected: null,
  showAll: function() {
    return !this.selected();
  },
  selectAll: function(){
    this.selected(null);
  },
  addTitle: function() {
    return "Add category: " + this.newCategory();
  }
}, 'categories');