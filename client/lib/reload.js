var niceReload = function () {
  Reload._reload();
};

Template.body.onCreated(function () {
  var modifierDown = false;
  // ctr key
  var modifierKey = 17;
  //if (navigator.appVersion.indexOf("Win")!=-1) {
  //  // use alt key on windows because chrome uses ctr+L
  //  modifierKey = 18
  //}
  $(document).keydown(function(e)
  {
    if (e.keyCode == modifierKey) modifierDown = true;
  }).keyup(function(e)
  {
    if (e.keyCode == modifierKey) modifierDown = false;
  });

  $(document).keydown(function(e) {
    if (modifierDown && e.keyCode === 76 /* L key */) {
      niceReload();
    }
  });
});