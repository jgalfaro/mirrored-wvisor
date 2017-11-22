App.FineGrainedCluster = DS.Model.extend({
  experiment: DS.belongsTo("experiment"),
  clusterId: DS.attr("number"),
  urls: DS.attr("number"),
  noiseUrls: DS.attr("number"),
  dunn: DS.attr("number"),
  // it's not really eigen values, it's info percentage per axis
  eigvalX: DS.attr("number"),
  eigvalY: DS.attr("number"),
  eigvalZ: DS.attr("number"),
});
