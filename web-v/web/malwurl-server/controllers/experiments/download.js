/* jshint camelcase: false */

var BaseController = require("../base");
var experimentModule = require("../../models/experiment");
var experimentModel = new experimentModule();
var settings = require("../../settings.js");
var path = require("path");
var mime = require("mime");
var fs = require("fs");

module.exports = BaseController.extend({
  name: "Experiments.Download",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var experimentId = req.params.experiment_id;
    experimentModel.downloadExperiment(experimentId, function() {
      var file = settings.dataPath + "experiments/"
          + experimentId + ".zip";

      var filename = path.basename(file);
      var mimetype = mime.lookup(file);

      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', mimetype);

      var filestream = fs.createReadStream(file);
      filestream.pipe(res);
    });
  }
});
