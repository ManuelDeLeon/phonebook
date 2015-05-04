Template.editContactForm.viewmodel({
  category: null,
  categories: function () {
    return Categories.find();
  }
})