App.Experiment = DS.Model.extend({
  description: DS.attr("string"),
  progress: DS.attr("number"),
  dataset: DS.belongsTo("dataset"),
  creationDate: DS.attr("string"),
  finished: DS.attr("boolean", {defaultValue: false}),
  completionDate: DS.attr("string"),

  "coarseGrained-clusteringAlgorithm":
    DS.attr("string", {defaultValue: "kmeans"}),
  "coarseGrained-clusteringAlgorithm-kmeans-k":
    DS.attr("number", {defaultValue: 30}),
  "coarseGrained-clusteringAlgorithm-kmeans-distance":
    DS.attr("string", {defaultValue: "lettersFrequency"}),

  "fineGrained-clusteringAlgorithm":
    DS.attr("string", {defaultValue: "DBScan"}),
  "fineGrained-clusteringAlgorithm-dbscan-eps":
    DS.attr("number", {defaultValue: 0.5}),
  "fineGrained-clusteringAlgorithm-dbscan-k":
    DS.attr("number", {defaultValue: 3}),
  // "v1-KeyMat"
  "fineGrained-clusteringAlgorithm-dbscan-distance":
    DS.attr("string", {defaultValue: "v2-KeyMatByVal"}),
  "fineGrained-quality-dunn":
    DS.attr("boolean", {defaultValue: true}),
  "fineGrained-visualization-enable":
    DS.attr("boolean", {defaultValue: true}),
  "fineGrained-visualization-dimensionsReduction":
    DS.attr("string", {defaultValue: "MDS"}),

  "signatures-enable": DS.attr("boolean", {defaultValue: false}),

  dunnMedian: DS.attr("number"),
  dunnAverage: DS.attr("number"),
  dunnMin: DS.attr("number"),
  dunnMax: DS.attr("number"),

  fineGrainedClusters: DS.hasMany("FineGrainedCluster")
});
