Contacts.allow(Server.allow.owner);
Contacts.before.insert(function(userId, doc){
  doc.owner = userId;
});
Contacts.after.remove(function (userId, doc) {
  Server.upload.delete(doc.imageFile);
});
Contacts.before.update(function(userId, doc, fieldNames, modifier, options){
  var mset = modifier['$set'];
  if (mset && doc.imageFile && (mset.imageFile !== doc.imageFile)){
    Server.upload.delete(doc.imageFile);
  }
});