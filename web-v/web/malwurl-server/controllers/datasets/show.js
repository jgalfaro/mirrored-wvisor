/* jshint camelcase: false */

var BaseController = require("../base");
var JsonTemplate = require("../../templates/json");
var datasetModule = require("../../models/dataset");
var datasetModel = new datasetModule();

module.exports = BaseController.extend({
  name: "Datasets.Show",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var datasetId = req.params.dataset_id;
    var jsonTemplate = new JsonTemplate(res, "Datasets.Show");
    datasetModel.getDataset(req.db, datasetId, function(datasetRecord) {
      jsonTemplate.render(
        {dataset: datasetRecord}
      );
    });
  }
});
