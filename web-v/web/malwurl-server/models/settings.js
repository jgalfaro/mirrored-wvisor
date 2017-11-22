var Model = require("./base");
var Data = require("../settings");

var model = new Model();

var SettingsModel = model.extend({
  get: function(key) {
    return Data[key];
  },
  getall: function() {
    coll = [];
    var i = 2;
    for(var k in Data) {
      coll.push({
        id: i,
        key: k,
        value: Data[k]
      });
      i++;
    }
    return coll;
  }
});
module.exports = SettingsModel;
