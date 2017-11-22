App.FineGrained2dvisualizationController = Ember.ObjectController.extend({
  selectedCluster: null,

  clusterSelected: function() {
    if (this.get("selectedCluster")) {
      var experimentId = parseInt(this.get("selectedCluster").id / 100);
      var clusterId = this.get("selectedCluster").id - experimentId*100;
      var path = remoteHost+"/data/experiments/"+experimentId+"/clusters/fine_grained/"+clusterId+"-mds.tsv";

      d3Render(path);
    }
  }.observes("selectedCluster"),

  clustersAvailable: function() {
    var fineGrainedClusters = this.get("fineGrainedClusters");
    console.log(this.get("model"));
    var availableClusters = [];
    for(var i=0; i<fineGrainedClusters.length; i++) {
      availableClusters.push(fineGrainedClusters[i]);
    }
    return this.get("fineGrainedClusters").filterProperty('eigvalY');
  }.property(),

  xinfo: function() {
    var experimentId = parseInt(this.get("selectedCluster").id / 100);
    var clusterId = this.get("selectedCluster").id - experimentId*100;
    for(var i=0; i<this.get("clustersAvailable").length; i++) {
      if (this.get("clustersAvailable")[i].id == this.get("selectedCluster").id) {
        var c = this.get("clustersAvailable").objectAt(i);
        $("span#xinfo").text(c.get("eigvalX")+"%");
        break;
      }
    }
  }.observes("selectedCluster"),

  yinfo: function() {
    var experimentId = parseInt(this.get("selectedCluster").id / 100);
    var clusterId = this.get("selectedCluster").id - experimentId*100;
    for(var i=0; i<this.get("clustersAvailable").length; i++) {
      if (this.get("clustersAvailable")[i].id == this.get("selectedCluster").id) {
        var c = this.get("clustersAvailable").objectAt(i);
        $("span#yinfo").text(c.get("eigvalY")+"%");
        break;
      }
    }
  }.observes("selectedCluster")
});
