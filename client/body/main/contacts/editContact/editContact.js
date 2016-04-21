Template.editContact.viewmodel({
  mixin: 'email',
  share: ['categories', 'edited'],
  autorun: function() {
    var t = this.templateInstance;
    // console.log(this.categoryId());
    t.$('.ui.search.dropdown').dropdown('set selected', this.categoryId());
  },
  onRendered: function(t) {
    if (this._id()) {
      this.load( Contacts.findOne(this._id()) );
    } else {
      this.categoryId( this.selectedCategory() );
      t.$('.ui.search.dropdown').dropdown();
    }
  },
  doChangeCategory: function(e) {
    this.categoryId(e.target.value);
  },
  cardViewModel: function() {
    return this;
  },
  _id: '',
  name: '',
  number: '',
  email: '',
  categoryId: '',
  categories: function () {
    return Categories.find();
  },
  upsertText: function () {
    return this._id() ? "Update Information" : "Create Contact";
  },
  canUpsert: function () {
    return this.name() && this.number() && this.validEmail(this.email()) && this.categoryId();
  },
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
  },
  uploaderEvents: function() {
    return {
      finished: function (index, fileInfo, templateContext) {
        var id = templateContext.data.formData._id;
        Contacts.update( id, { $set: { imageFile: fileInfo.name }, $inc: { imageVersion: 1 } }, function(err) {
          if (err) {
            toastr.error("Could not update contact:<br>" + err.reason);
          }
        });
      }
    };
  },
  uploaderData: function() {
    return {
      _id: this._id()
    };
  }
});
