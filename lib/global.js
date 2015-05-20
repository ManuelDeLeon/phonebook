var delayed = {};

Global = {
  defaultImage: '/images/user.png',

  delay:  function(time, nameOrFunc, fn) {
    var d, func, id, name;
    func = fn || nameOrFunc;
    if (fn) {
      name = nameOrFunc;
    }
    if (name) {
      d = delayed[name];
    }
    if (d != null) {
      Meteor.clearTimeout(d);
    }
    id = Meteor.setTimeout(func, time);
    if (name) {
      return delayed[name] = id;
    }
  }
};
