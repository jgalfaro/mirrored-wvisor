var BaseController = require("../base");
var fs = require("fs");
var JsonTemplate = require("../../templates/json");
var settings = require("../../settings");
var countlines = require("../../lib/countlines");
var datasetModule = require("../../models/dataset");
var datasetModel = new datasetModule();

module.exports = BaseController.extend({
  name: "Datasets.New",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.files) {
      countlines(req.files.file.path, function(countURLs) {
        datasetModel.getLastIdDataset(req.db, function(lastId) {

          var dataset = {
            name: req.body.name,
            countURLs: countURLs,
            uploadDate: new Date(),
            description: req.body.description,
            downloadPath: "/datasets/" + (lastId+1) + ".txt"
          };
          datasetModel.insertDataset(req.db, dataset);

          fs.readFile(req.files.file.path, function (err, data) {
            var newPath = settings.dataPath
              + "datasets/" + (lastId+1) + ".txt";
            fs.writeFile(newPath, data, function (err) {
              console.log(newPath + " uploaded.");
            });
          });
        });
      });
    }

    var jsonTemplate = new JsonTemplate(res, "empty");
    jsonTemplate.render({});
  }
});
