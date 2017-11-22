App.DatasetsNewController = Ember.ArrayController.extend({
  isUploading: false,

  actions: {
    sendFile: function() {
      this.set("isUploading", true);
    },
    uploaded: function() {
      this.set("isUploading", false);
      // Force reloading datasets to have the new one
      this.get("store").find("dataset");
      this.transitionToRoute("datasets");
    }
  }
});
