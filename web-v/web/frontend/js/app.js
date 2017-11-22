window.App = Ember.Application.create();

// App.ApplicationAdapter = DS.LSAdapter; for Local Storage
// but need a web server
//App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: remoteHost
});
App.Store = DS.Store.extend();
