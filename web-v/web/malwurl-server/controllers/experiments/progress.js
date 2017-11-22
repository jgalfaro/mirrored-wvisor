var fs = require("fs");
var logger = require("../../lib/logFactory").LogFactory.logger;
var settings = require("../../settings");
var Tail = require("../../vendor/node-tail/release/tail").Tail;
var experimentModule = require("../../models/experiment");
var experimentModel = new experimentModule();

var markAsFinished = function(db, experimentId, experiment) {
  experiment.finished = 1;

  // stat on stdout file
  // mtime is completionDate
  var stdoutPath = settings.dataPath + "experiments/"+experimentId;
    + "/stdout.log";
  fs.stat(stdoutPath, function(err, stats) {
    experiment.completionDate = stats.mtime;
    experimentModel.editExperiment(db, experiment, experimentId);
  });
};

var updateProgress = function(db, experimentId, progress) {
  progress = parseInt(progress.match(/\d+/)[0]);

  experimentModel.getExperiment(db, experimentId,
    function(experiment) {
    if (progress > experiment.progress) {
      experiment.progress = progress;
      experimentModel.editExperiment(db, experiment, experimentId);
    }
  });
};

module.exports = function(db, io){

  io.of("/progress")
  .on("connection", function(socket) {
    logger.log("info", "Progress socket opened");

    var stdout;
    // var stderr;
    var tailStdout;
    // var tailStderr;
    var base_path;

    socket.on("disconnect", function(){
      logger.debug("Progress socket disconnected from client");
      if (stdout) {
        // unwatch file
      }
    });
    
    // on getting experimentId
    socket.on("progress_load_experiment", function (experimentId) {
      //logger.debug("RECV progress_load_experiments "+experimentId);
      // ajust paths for this experiment id
      base_path = settings.dataPath + "experiments/"+experimentId;
      stdout = base_path + "/stdout.log";
      // watch files
      tailStdout = new Tail(stdout);
      tailStdout.on("line", function(data) {
        var match = data.match(/(\d{1,3})%/g);
        if (match) {
          var progress = match[match.length-1];
          //logger.debug("SEND progress "+experimentId+" "+progress);
          socket.emit("progress", {rid: experimentId, progress: progress});
          experimentModel.isNotFinished(db, experimentId,
            function(experiment) {
            updateProgress(db, experimentId, progress);
            if (data.match(/100%/g)) {
              markAsFinished(db, experimentId, experiment);
            }
          });
        }
      });
    });
  });
};
