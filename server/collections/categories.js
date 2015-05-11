Categories.allow(Server.allow.owner);
Categories.before.insert(function(userId, doc){
  console.log("before");
  console.log(doc);
  doc.owner = userId;
});
Categories.after.remove(function (userId, doc) {
  Contacts.remove( { categoryId: doc._id } );
});