Categories = new Mongo.Collection("categories");
Contacts = new Mongo.Collection("contacts");
Images = new FileCollection({
  resumable: true,
  http: [
    {
      method: 'get',
      path: '/:md5',
      lookup: function(params, query) {
        return {
          md5: params.md5
        };
      }
    }
  ]
});