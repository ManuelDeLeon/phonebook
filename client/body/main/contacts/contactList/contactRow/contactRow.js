Template.contactRow.viewmodel({
  share: {
    edited: 'edited'
  },
  rowHover: false,
  rowClick: function() {
    this.edited._id(this._id());
    this.edited.editMode(true);
  },
  deleteTitle: function() {
    return "Delete '" + this.name() + "'";
  },
  thumbnail: function(){
    return Contacts.findOne(this._id()).image();
  },
  categoryName: function() {
    return Categories.findOne(this.categoryId()).name;
  },
  delete: function() {
    var self = this;
    Client.alert({
      header: "Are you sure you want to delete '" + self.name() + "'?",
      description: "You're about to delete '" + self.name() + "'. Do you really want to delete it?",
      image: "trash",
      onApprove: function () {
        Contacts.remove(self._id());
      }
    });
  },
  cardViewModel: function() {
    return this;
  }
});
