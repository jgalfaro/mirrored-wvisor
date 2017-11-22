/*jshint maxlen:150,camelcase: false*/

var BaseController = require("../base");
var JsonTemplate = require("../../templates/json");
var datasetModule = require("../../models/dataset");
var datasetModel = new datasetModule();

module.exports = BaseController.extend({
  name: "Datasets.Edit",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var jsonTemplate = new JsonTemplate(res, "Datasets.Edit");
    var datasetId = req.params.dataset_id;
    if (req.method === "OPTIONS") {
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = "86400"; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();
    }
    else {
      datasetModel.editDataset(req.db, req.body.dataset, datasetId);
      jsonTemplate.render({});
    }
  }
});
