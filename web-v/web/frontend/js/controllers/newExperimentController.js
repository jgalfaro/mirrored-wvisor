App.NewExperimentController = Ember.ObjectController.extend({
  datasetEmpty: false,
  coarseGrainedClusteringAlgorithm: [
    "kmeans"
  ],
  coarseGrainedClusteringAlgorithmKmeansDistance: [
    "lettersFrequency"
  ],
  fineGrainedClusteringAlgorithm: [
    "DBScan"
  ],
  fineGrainedClusteringAlgorithmDbscanDistance: [
    "v1-KeyMat",
    "v2-KeyMatByVal"
  ],
  fineGrainedVisualizationDimensionsReduction: [
    "MDS"
  ],

  datasets: function() {
    return this.get("store").find("dataset");
  }.property(),

  actions: {
    save: function() {
      // just before saving, we set the creationDate
      this.get("model").set("progress", 0);

      // error handling where no dataset selected
      this.set("datasetEmpty",
        this.get("model").get("dataset") === null);
      if(this.get("datasetEmpty")) {
        window.scrollTo(0, 0);
      }
      else {
        this.get("model").save();
        this.transitionToRoute("index");
      }
    }
  }
});
