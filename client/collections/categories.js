Categories.before.insert(function(userId, doc){
  doc.owner = userId;
});
