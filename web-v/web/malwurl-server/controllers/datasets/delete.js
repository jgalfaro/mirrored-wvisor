/*jshint camelcase: false*/

var BaseController = require("../base");
var fs = require("fs");
var JsonTemplate = require("../../templates/json");
var settings = require("../../settings");
var datasetModule = require("../../models/dataset");
var datasetModel = new datasetModule();

module.exports = BaseController.extend({
  name: "Datasets.Delete",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var datasetId = req.params.dataset_id;
    datasetModel.deleteDataset(req.db, datasetId);

    // remove the file
    var path = settings.dataPath + "datasets/" + datasetId + ".txt";
    fs.unlink(path, function (err) {
      if (err) {
        throw err;
      }
      console.log("successfully deleted " + path);
    });
    var jsonTemplate = new JsonTemplate(res, "empty");
    jsonTemplate.render({});
  }
});
