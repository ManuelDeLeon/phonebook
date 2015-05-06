Categories.allow(Server.allow.owner);
Categories.after.remove(function (userId, doc) {
  Contacts.remove( { categoryId: doc._id } );
});