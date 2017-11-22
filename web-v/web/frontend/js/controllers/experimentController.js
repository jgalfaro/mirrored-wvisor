App.ExperimentController = Ember.ObjectController.extend({
  isRemoving: false,

  fineGrainedFeatures: function() {
    return this.get("fineGrained-quality-dunn")
      || this.get("fineGrained-visualization-enable");
  }.property(this.model),

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
