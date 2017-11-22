// var BaseController = require("../base");
// var JsonTemplate = require("../../templates/json");
// var experimentModule = require("../../models/experiment");
// var experimentModel = new experimentModule();

// module.exports = BaseController.extend({
//   name: "Experiments.List",
//   run: function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     var jsonTemplate = new JsonTemplate(res, "Experiments.List");
//     experimentModel.getAllExperiments(req.db,
//       function(experimentsList) {
//       jsonTemplate.render(
//         {
//           experiments: experimentsList
//         }
//       );
//     });
//   }
// });


var BaseController = require("../base");
var JsonTemplate = require("../../templates/json");
var experimentModule = require("../../models/experiment");
var experimentModel = new experimentModule();
var fineGrainedClusterModule = require("../../models/finegrainedcluster");
var fineGrainedClusterModel = new fineGrainedClusterModule();


module.exports = BaseController.extend({
  name: "Experiments.List",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var jsonTemplate = new JsonTemplate(res, "Experiments.List");
    experimentModel.getAllExperiments(req.db,
      function(experimentsList) {
      var allClusters = [];
      var n = 0;
      if (experimentsList.length > 0) {
        experimentsList.forEach(function (el,index,array) {
          console.log(el);
          fineGrainedClusterModel.getFine(req.db,
            el.id, el.finished, function(clusters) {
            allClusters = allClusters.concat(clusters);
            n++;
            if (n == experimentsList.length) {
              jsonTemplate.render(
                {
                  experiments: experimentsList,
                  fineGrainedClusters: allClusters
                }
              );
            }
          });
        });
      }
      else {
        jsonTemplate.render({
          experiments: [],
          fineGrainedClusters: []
        });
      }
    });
  }
});

// fineGrainedClusters: [{
//   id: 1,
//   experiment: 8,
//   clusterId: 2,
//   urls: 5000,
//   noiseUrls: 12000,
//   coarseGrainCluster: 7,
//   dunn: 1.19,
//   eigvalX: 1.23,
//   eigvalY: 2.31,
//   eigvalZ: 0.13
// },
// {
//   id: 2,
//   experiment: 9,
//   clusterId: 3,
//   urls: 4000,
//   noiseUrls: 11000,
//   coarseGrainCluster: 7,
//   dunn: 1.39,
//   eigvalX: 1.13,
//   eigvalY: 2.51,
//   eigvalZ: 0.03
// },
// {
//   id: 3,
//   experiment: 10,
//   clusterId: 4,
//   urls: 9000,
//   noiseUrls: 19000,
//   coarseGrainCluster: 9,
//   dunn: 1.13,
//   eigvalX: 3.23,
//   eigvalY: 2.31,
//   eigvalZ: 0.73
// }]


