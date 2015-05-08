Meteor.publish('main', function(){
  return [
    Categories.find({ owner: this.userId }),
    Contacts.find({ owner: this.userId })
  ];
});