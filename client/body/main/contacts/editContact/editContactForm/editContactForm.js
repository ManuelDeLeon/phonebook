Template.editContactForm.viewmodel('editContactForm', {
  name: '',
  number: '',
  email: '',
  categoryId: '',
  categories: function () {
    return Categories.find();
  },
  create: function () {
    Contacts.insert({
      name: this.name(),
      number: this.number(),
      email: this.email(),
      categoryId: this.categoryId()
    })
  }
})