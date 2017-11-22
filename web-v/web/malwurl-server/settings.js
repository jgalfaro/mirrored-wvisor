
/*
 * Settings for malwurl-server
 *
 * blaPath variables must include trailing slashes
 */

var path = require("path");

module.exports = {
  dataPath: path.join(__dirname + "/public/data/"),
  malwurlPath: path.join(__dirname + "/../../")
};
