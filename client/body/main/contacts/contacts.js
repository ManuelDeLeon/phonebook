Template.contacts.viewmodel('contacts', {
  editMode: false,
  selected: null,
  changeEditMode: function(edit) {
    if (edit === this.editMode()) return;
    if (!edit) this.selected(null);
    this.editMode(edit);
  },
  showEdit: function() {
    if (this.selected()) {
      this.changeEditMode(!!Contacts.findOne(this.selected()));
    }
    return this.editMode();
  },
  editText: function() {
    return this.selected() ? "Edit Contact" : "New Contact";
  }
}, ['showEdit']);