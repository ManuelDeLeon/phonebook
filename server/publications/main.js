Meteor.publish('main', function(){
  if (! this.userId) return [];
  return [
    Categories.find({ owner: this.userId }),
    Contacts.find({ owner: this.userId })
  ];
});