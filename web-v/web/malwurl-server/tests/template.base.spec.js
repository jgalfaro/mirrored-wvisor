var View = require("../templates/Base");

describe("Base view", function() {
  it("create and render new view", function(next) {
    var responseMockup = {
      render: function(template, data) {
        expect(data.myProperty).toBe("value");
        expect(template).toBe("template-file");
        next();
      }
    };
    var v = new View(responseMockup, "template-file");
    v.render({myProperty: "value"});
  });

  it("should be extendable", function(next) {
    var v = new View({ parentProperty: "parent" });
    expect(v.response.parentProperty).toBe("parent");
    var OtherView = v.extend({
      render: function(data) {
        expect(data.childProperty).toBe("child");
        next();
      }
    });
    var otherViewInstance = new OtherView();
    expect(otherViewInstance.render).toBeDefined();
    otherViewInstance.render({childProperty: "child"});
  });
});
