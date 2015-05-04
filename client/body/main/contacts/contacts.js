Template.contacts.viewmodel('contacts', {
  editMode: false,
  isNew: false,
  toggle: function() {
    var addNew = !this.editMode()
    this.isNew(addNew);
    this.editMode(addNew);
  },
  toggleText: function() {
    return this.editMode() ? "Back To Contact List" : "Add New Contact...";
  },
  toggleColor: function() {
    return this.editMode() ? "" : "green";
  }
}, ['editMode', 'isNew'])