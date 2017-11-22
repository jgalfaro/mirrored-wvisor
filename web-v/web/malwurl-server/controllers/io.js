var BaseController = require("./base");

module.exports = BaseController.extend({
  name: "Io",
  connect: function(socket, data) {
    return null;
  },
  disconnect: function(socket) {
    return null;
  }
});

