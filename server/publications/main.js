Meteor.publish('main', function(){
  return [
    Categories.find({ owner: this.userId }),
    Contacts.find({ owner: this.userId }),
    Images.find({
      'metadata._Resumable': {
        $exists: false
      },
      'metadata._auth.owner': this.userId
    })
  ];
});