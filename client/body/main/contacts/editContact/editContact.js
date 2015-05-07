Template.editContact.viewmodel('editContact',
  {
    uploaderEvents: function() {
      return {
        finished: function (index, fileInfo, templateContext) {
          var id = templateContext.data.formData._id;
          Contacts.update( id, { $set: { image: "/upload/" + fileInfo.name }, $inc: { imageVersion: 1 } }, function(err) {
            if (err) {
              toastr.error("Could not update contact:<br>" + err.reason);
            }
          });
        }
      };
    },
    uploaderData: function() {
      return {
        _id: this.editId()
      };
    },
    editId: function () {
      var vm = ViewModel.byId("editContactForm");
      return vm && vm._id();
    }
  },
  ['uploaderEvents', 'uploaderData', 'editId']
)