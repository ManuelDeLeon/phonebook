Template.card.viewmodel(function(cardViewModel) {
  return cardViewModel;
});

Template.card.created = function () {
  console.log("card.onCreated");
};

Template.card.rendered = function () {
  console.log("card.onRendered");
};

Template.card.destroyed = function () {
  console.log("card.onDestroyed");
};