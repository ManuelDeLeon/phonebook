Template.contacts.viewmodel('contacts', {
  editMode: false,
  toggle: function() {
    this.editMode(!this.editMode());
  },
  toggleText: function() {
    return this.editMode() ? "Back To Contact List" : "Add New Contact...";
  },
  toggleColor: function() {
    return this.editMode() ? "" : "green";
  }
}, 'editMode')