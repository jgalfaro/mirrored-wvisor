/* jshint camelcase: false */

var BaseController = require("../base");
var JsonTemplate = require("../../templates/json");
var experimentModule = require("../../models/experiment");
var experimentModel = new experimentModule();
var datasetModule = require("../../models/dataset");
var datasetModel = new datasetModule();
var fineGrainedClusterModule = require("../../models/finegrainedcluster");
var fineGrainedClusterModel = new fineGrainedClusterModule();

module.exports = BaseController.extend({
  name: "Experiments.Show",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var experimentId = req.params.experiment_id;
    var jsonTemplate = new JsonTemplate(res, "Experiments.Show");
    experimentModel.getExperiment(req.db, experimentId,
      function(experimentRecord) {
      datasetModel.getDataset(req.db, experimentRecord.dataset,
        function(datasetRecord) {
        fineGrainedClusterModel.getFine(req.db,
          experimentId, experimentRecord.finished, function(clusters) {
          jsonTemplate.render(
            {
              experiment: experimentRecord,
              dataset: datasetRecord,
              fineGrainedClusters: clusters
            }
          );
        });
      });
    });
  }
});

/*
[{
              id: 1,
              experiment: 8,
              clusterId: 2,
              urls: 5000,
              noiseUrls: 12000,
              coarseGrainCluster: 7,
              dunn: 1.19,
              eigvalX: 1.23,
              eigvalY: 2.31,
              eigvalZ: 0.13
            }]
*/

