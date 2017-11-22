/*jshint camelcase: false*/

var BaseController = require("../base");
var fs = require("fs");
var JsonTemplate = require("../../templates/json");
var experimentModule = require("../../models/experiment");
var experimentModel = new experimentModule();

module.exports = BaseController.extend({
  name: "Experiments.Delete",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var experimentId = req.params.experiment_id;
    experimentModel.deleteExperiment(req.db, experimentId);

    var jsonTemplate = new JsonTemplate(res, "empty");
    jsonTemplate.render({});
  }
});
