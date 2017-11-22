var Model = require("../models/Base");

var dataMockup = {};

describe("Models", function() {
  it("should create a new model", function(next) {
    var model = new Model(dataMockup);
    expect(model.data).toBeDefined();
    expect(model.extend).toBeDefined();
    next();
  });
  
  it("should be extendable", function(next) {
    var model = new Model(dataMockup);
    var OtherTypeOfModel = model.extend({
      myCustomModelMethod: function() { }
    });
    var model2 = new OtherTypeOfModel(dataMockup);
    expect(model2.data).toBeDefined();
    expect(model2.myCustomModelMethod).toBeDefined();
    next();
  });
});
