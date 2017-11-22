var fs = require("fs");
var path = require("path");
var Settings = require("../models/Settings");
var settings = new Settings();

var mock = {
  dataPath: path.join(__dirname + "/../data/"),
  malwurlPath: path.join(__dirname + "/../../../")
};

describe("Settings setup", function() {
  it("shoud load all", function(next) {
    expect(settings.getall()).toEqual(mock);
    next();
  });

  describe("dataPath", function() {
    it("shoud load", function(next) {
      expect(settings.get("dataPath")).toBe(mock.dataPath);
      next();
    });
    
    it("path should exist", function(next) {
      var dir = settings.get("dataPath");
      expect(fs.statSync(dir).isDirectory()).toBeTruthy();
      next();
    });
  });

  describe("malwurlPath", function() {
    it("shoud load", function(next) {
      expect(settings.get("malwurlPath")).toBe(mock.malwurlPath);
      next();
    });
    
    it("path should exist", function(next) {
      var dir = settings.get("malwurlPath");
      expect(fs.statSync(dir).isDirectory()).toBeTruthy();
      next();
    });
  });
});
