App.DatasetController = Ember.ObjectController.extend({
  isDescriptionHidden: true,
  isRemoving: false,

  actions: {
    toggleDescriptionDataset: function() {
      this.toggleProperty("isDescriptionHidden");
    },
    removeDataset: function() {
      this.toggleProperty("isRemoving");
    },
    cancelRemoveDataset: function() {
      this.set("isRemoving", false);
    },
    confirmRemoveDataset: function() {
      var dataset = this.get("model");
      dataset.deleteRecord();
      dataset.save();
      this.set("isRemoving", false);
    },
    edit: function(datasetId) {
      this.transitionToRoute("dataset.edit", datasetId);
    }
  }
});
