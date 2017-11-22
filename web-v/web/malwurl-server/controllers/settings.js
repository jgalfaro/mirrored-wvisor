var BaseController = require("./base");
var SettingsModel = require("../models/settings");
var JsonTemplate = require("../templates/json");

var settings = new SettingsModel();

module.exports = BaseController.extend({
  name: "Settings",
  run: function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var jsonTemplate = new JsonTemplate(res, "settings");
    jsonTemplate.render({
      settings: settings.getall()
    });
  }
});
