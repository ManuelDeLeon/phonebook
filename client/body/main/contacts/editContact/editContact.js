Template.editContact.viewmodel('editContact',
  function(data) {
    return {
      isNew: data.isNew
    };
  },
  {
    cardViewModel: function() {
      if (this.isNew()) {
        return Card.editViewModel;
      } else {
        return Card.readViewModel;
      }
    }
  },
  'cardViewModel'
)