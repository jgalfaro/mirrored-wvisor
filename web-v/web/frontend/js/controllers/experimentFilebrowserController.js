App.ExperimentFilebrowserController = Ember.ObjectController.extend({
  urlBrowser: function() {
    return remoteHost + "/data/experiments/" + this.get("id");
  }.property(this.model)
});
