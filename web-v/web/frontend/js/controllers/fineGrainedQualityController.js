App.FineGrainedQualityController = Ember.ObjectController.extend({
  urlBrowser: function(clusterId) {
    return remoteHost + "/data/experiments/" + this.get("id")
      + "/clusters/fine_grained";
  }.property(),
  // (this.model)
});
