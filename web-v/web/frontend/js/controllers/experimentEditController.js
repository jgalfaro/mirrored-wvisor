App.ExperimentEditController = Ember.ObjectController.extend({
  actions: {
    save: function() {
      var experiment = this.get("model");
      experiment.save();
      this.transitionToRoute("experiment", experiment);
    }
  }
});
