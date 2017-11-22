App.Setting = DS.Model.extend({
  key: DS.attr("string"),
  value: DS.attr("string")
});

App.Setting.FIXTURES = [
  {
    id: 1,
    key: "remoteHost",
    value: remoteHost
  },
  {
    id: 2,
    key: "key2",
    value: "value2"
  },
];

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    this.store.push("setting", {
      id: 1,
      key: "remoteHost",
      value: remoteHost
    });
  }
});
