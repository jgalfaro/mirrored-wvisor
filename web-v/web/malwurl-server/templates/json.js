var Template = require("./base");

var template = new Template();

var JSONTemplate = template.extend({
  render: function(data) {
    this.response.contentType("application/json");
    this.response.send(JSON.stringify(data));
  }
});
module.exports = JSONTemplate;
