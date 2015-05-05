Template.contactList.viewmodel({
  contacts: function() {
    return Contacts.find();
  }
}, 'contacts')