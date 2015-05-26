Contacts.allow(Server.allow.owner);

Contacts.afterRemove = function (userId, doc) {
  Server.upload.delete(doc._id, doc.imageFile);
};

Contacts.after.remove(Contacts.afterRemove);

Contacts.beforeUpdate = function(userId, doc, fieldNames, modifier, options){
  var mset = modifier['$set'];
  if (mset && doc.imageFile && (mset.imageFile !== doc.imageFile)){
    Server.upload.delete(doc._id, doc.imageFile);
  }
};

Contacts.before.update(Contacts.beforeUpdate);