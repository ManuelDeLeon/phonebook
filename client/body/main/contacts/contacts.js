Template.contacts.viewmodel({
  share: 'edited',
  onUrl: ['editMode', '_id'],
  vmTag: 'contacts',
  editText: function() {
    return this._id() ? "Edit Contact" : "New Contact";
  },
  showContacts: function() {
    this._id('');
    this.editMode(false);
  }
});
