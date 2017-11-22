App.ExperimentIndexController = Ember.ObjectController.extend({
  isRemoving: false,

  downloadPath: function() {
    return "/../experiments/" + this.get("id") + "/download";
  }.property(),

  actions: {
    edit: function(experimentId) {
      this.transitionToRoute("experiment.edit", experimentId);
    },
    removeExperiment: function() {
      this.toggleProperty("isRemoving");
    },
    cancelRemoveExperiment: function() {
      this.set("isRemoving", false);
    },
    confirmRemoveExperiment: function() {
      var experiment = this.get("model");
      experiment.deleteRecord();
      experiment.save();
      this.set("isRemoving", false);
      this.transitionToRoute("experiments.index");
    },
  }
});
