Template.contacts.viewmodel('contacts',
  function (context) {
    // Add all properties in the context to this view model
    // In this case it's only selectedCategory
    return context;
  },
  {
    editMode: false,
    selected: null,
    onUrl: ['editMode', 'selected'],
    changeEditMode: function(edit) {
      if (edit === this.editMode()) return;
      if (!edit) this.selected(null);
      this.editMode(edit);
    },
    autorun: function() {
      if (this.selected() && Client.subscriptions.mainReady) {
        this.changeEditMode(!!Contacts.findOne(this.selected()));
      }
    },
    editText: function() {
      return this.selected() ? "Edit Contact" : "New Contact";
    },
    context: function() {
      return {
        selectedCategory: this.selectedCategory // Pass the reference, not the value
      }
    }
  },
  ['editMode', 'context']
);
