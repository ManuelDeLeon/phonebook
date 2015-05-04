Images.allow({
  insert: function(userId, file) {
    if (! userId) return false;
    file.metadata = file.metadata || {};
    file.metadata._auth = {
      owner: userId
    };
    return true;
  },
  remove: function(userId, file) {
    if (! userId) return false;
    return file.metadata && file.metadata._auth && file.metadata._auth.owner === userId;
  },
  read: function(userId, file) {
    if (! userId) return false;
    return file.metadata && file.metadata._auth && file.metadata._auth.owner === userId;
  },
  write: function(userId, file, fields) {
    if (! userId) return false;
    return file.metadata && file.metadata._auth && file.metadata._auth.owner === userId;
  }
});