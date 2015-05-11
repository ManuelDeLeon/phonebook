Contacts = new Mongo.Collection("contacts");
Contacts.helpers({
  imageUrl: function(){
    if (this.imageFile) {
      return "/upload/" + this.imageFile + "?v=" + this.imageVersion;
    } else {
      return Global.defaultImage;
    }
  }
});