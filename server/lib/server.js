Server = {

}

Server.allow = {
  owner: {
    insert: function (userId, doc) {
      return (doc.owner = userId);
    },
    update: function (userId, doc, fields, modifier) {
      return doc.owner === userId;
    },
    remove: function (userId, doc) {
      return doc.owner === userId;
    },
    fetch: ['owner']
  }
}