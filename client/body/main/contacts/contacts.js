Template.contacts.viewmodel('contacts', {
  editMode: false,
  selected: null,
  toggle: function() {
    this.selected(null);
    var addNew = !this.editMode();
    this.editMode(addNew);
  },
  toggleText: function() {
    return this.editMode() ? "Back To Contact List" : "Add New Contact...";
  },
  toggleColor: function() {
    return this.editMode() ? "teal" : "green";
  }
}, ['editMode'])