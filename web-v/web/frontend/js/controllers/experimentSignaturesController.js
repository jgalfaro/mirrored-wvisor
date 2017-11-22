App.ExperimentSignaturesController = Ember.ObjectController.extend({
  urlSignatures: function() {
    return remoteHost + "/data/experiments/" + this.get("id") + "/signatures";
  }.property(this.model)
});
