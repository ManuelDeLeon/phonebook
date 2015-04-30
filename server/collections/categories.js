Meteor.publish('categories', function(){
  return Categories.find({ owner: this.userId });
});

Categories.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return doc.owner === userId;
  },
  remove: function (userId, doc) {
    return doc.owner === userId;
  },
  fetch: ['owner']
});

Categories.before.insert(function (userId, doc) {
  doc.owner = userId;
});