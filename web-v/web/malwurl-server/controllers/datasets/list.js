var BaseController = require("../base");
var JsonTemplate = require("../../templates/json");
var datasetModule = require("../../models/dataset");
var datasetModel = new datasetModule();

module.exports = BaseController.extend({
  name: "Datasets.List",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var jsonTemplate = new JsonTemplate(res, "Datasets.List");
    datasetModel.getAllDatasets(req.db, function(datasetsList) {
      jsonTemplate.render(
        {datasets: datasetsList}
      );
    });
  }
});
