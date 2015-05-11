Template.editContactForm.viewmodel('editContactForm',
  function() {
    var contacts = ViewModel.byId("contacts");
    var selected = contacts && contacts.selected();
    if (selected) {
      return Contacts.findOne(selected);
    } else {
      var contacts = ViewModel.byId("categories");
      var categoryId = contacts && contacts.selected();
      return {
        _id: null,
        name: '',
        number: '',
        email: '',
        categoryId: categoryId
      }
    }
  },
  {
    nameInvalid: function () {
      return !this.name();
    },
    numberInvalid: function () {
      return !this.number();
    },
    emailInvalid: function () {
      return !Client.validEmail(this.email());
    },
    categoryIdInvalid: function () {
      return !this.categoryId();
    },
    categories: function () {
      return Categories.find();
    },
    upsertText: function () {
      return this._id() ? "Update Information" : "Create Contact";
    },
    canUpsert: function () {
      return !( this.nameInvalid() || this.numberInvalid() || this.emailInvalid() || this.categoryIdInvalid());
    },
    upsertHover: false,
    upsert: function () {
      var self = this;
      if (!self.canUpsert()) {
        return;
      }
      var contact = {
        name: this.name(),
        number: this.number(),
        email: this.email(),
        categoryId: this.categoryId()
      };

      if (self._id()) {
        Contacts.update(self._id(), {$set: contact}, function (err) {
          if (err) {
            toastr.error("Could not update contact:<br>" + err.reason);
          }
        });
      } else {
        Contacts.insert(contact, function (err, id) {
          if (err) {
            toastr.error("Could not create contact:<br>" + err.reason);
          } else {
            self._id(id);
          }
        });
      }
    }
  }
);