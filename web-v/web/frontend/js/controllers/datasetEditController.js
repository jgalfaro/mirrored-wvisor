App.DatasetEditController = Ember.ObjectController.extend({
  actions: {
    save: function() {
      var dataset = this.get("model");
      dataset.save();
      this.transitionToRoute("datasets");
    }
  }
});
