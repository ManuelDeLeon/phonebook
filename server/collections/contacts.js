Contacts.allow(Server.allow.owner);
Contacts.after.remove(function (userId, doc) {
  Server.deleteImages(doc._id);
});