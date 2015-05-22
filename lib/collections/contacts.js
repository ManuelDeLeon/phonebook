Contacts = new Mongo.Collection("contacts");

Contacts.addedHelpers = {
  imageUrl: function(){
    if (this.imageFile) {
      return "/upload/" + this.imageFile + "?v=" + this.imageVersion;
    } else {
      return Global.defaultImage;
    }
  }
};

Contacts.helpers(Contacts.addedHelpers);