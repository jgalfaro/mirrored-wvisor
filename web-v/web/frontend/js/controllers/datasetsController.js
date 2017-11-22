App.DatasetsController = Ember.ArrayController.extend({
  // FIXME: because we now have two controllers,
  // it doesn't work anymore
  sortProperties: ["uploadDate"],
  sortAscending: false // false = descending
});
