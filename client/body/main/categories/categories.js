Template.categories.viewmodel('categories', {
  categories: function() {
    return Categories.find();
  },
  newCategory: '',
  addNewCategory: function() {
    if (!this.newCategory()) return;
    Categories.insert({ name: this.newCategory() });
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