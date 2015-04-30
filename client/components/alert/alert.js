Template.alert.onRendered(function() {
  this.$(".ui.basic.modal")
    .modal('setting', this.data)
    .modal("show");
});
