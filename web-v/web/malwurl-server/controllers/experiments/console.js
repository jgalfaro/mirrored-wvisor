var logger = require("../../lib/logFactory").LogFactory.logger;
var settings = require("../../settings");
var Tail = require("../../vendor/node-tail/release/tail").Tail;

module.exports = function(io){

  io.of("/console")
  .on("connection", function(socket) {
    logger.log("info", "Console socket opened");

    var stdout;
    var stderr;
    var tailStdout;
    var tailStderr;
    var base_path;

    socket.on("disconnect", function(){
      logger.debug("Console socket disconnected from client");
      if (stdout) {
        // unwatch file
      }
      if (stderr) {
        // unwatch file
      }
    });
    
    // on getting experimentId
    socket.on("console_load_experiment", function (experimentId) {
      logger.debug("RECV console_load_experiment "+experimentId);
      // ajust paths for this experiment id
      base_path = settings.dataPath + "experiments/"+experimentId;
      stdout = base_path + "/stdout.log";
      stderr = base_path + "/stderr.log";
      // watch files
      tailStdout = new Tail(stdout);
      tailStderr = new Tail(stderr);
      tailStdout.on("line", function(data) {
        socket.emit("stdout", data+"<br>");
      });
      tailStderr.on("line", function(data) {
        socket.emit("stderr", data+"<br>");
      });
    });
  });
};
