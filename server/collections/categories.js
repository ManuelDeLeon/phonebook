Categories.allow(Server.allow.owner);

Categories.afterRemove = function (userId, doc) {
  Contacts.remove( { categoryId: doc._id } );
};

Categories.after.remove(Categories.afterRemove);