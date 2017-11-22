var fs = require("fs");
var settings = require("../settings.js");
var countlines = require("../lib/countlines");
var Model = require("./base");
var model = new Model();


function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

var getDunn = function(dunnPath, config, finished, fn) {
  if (config["fineGrained-quality-dunn"] && finished) {
    var dunnData = fs.readFileSync(dunnPath).toString();
    var match = dunnData.match(/dunn: (\d+\.\d+)/);
    if (match) {
      fn(parseFloat(match[1]));
    }
    else {
      fn(0);
    }
  }
  else {
    fn(0);
  }
};

var getEigVal = function(eigPath, config, finished, fn) {
  if (config["fineGrained-visualization-enable"]
    && config["fineGrained-visualization-dimensionsReduction"] == "MDS"
    && finished) {
    countlines(eigPath, function(eigCount) {
      var eigTotal = 0;
      var eigvals = [];
      var eigStream = fs.createReadStream(eigPath);
      readLines(eigStream, function(data) {
        eigvals.push(parseFloat(data));
        eigTotal += parseFloat(data);
        if (eigvals.length == eigCount) {
          if (eigTotal == 0) {
            fn(100.0, 0.0, 0.0);
          }
          else {
            fn(eigvals[0]/eigTotal*100,
              eigvals[1]/eigTotal*100,
              eigvals[2]/eigTotal*100);
          }
        }
      });
    });
  }
  else {
    fn(0, 0, 0);
  }
};



var getFine = function(db, experimentId, finished, fn) {
  var clusters = [];
  var fileExist = true;
  var numbers = [];

  var configPath = settings.dataPath + "experiments/" + experimentId
    + "/config.json";
  var data = fs.readFileSync(configPath);
  var config = JSON.parse(data);

  var basePath = settings.dataPath + "experiments/" + experimentId
    + "/clusters/fine_grained/";

  for(var j=0; j < config["coarseGrained-clusteringAlgorithm-kmeans-k"]; j++) {
    numbers.push(j)
  }

  var n = 0;
  if (finished) {
    numbers.forEach(function(j, index, array) {
      var countPath = settings.dataPath + "experiments/" + experimentId
        + "/clusters/coarse_grained_typed/" + j + ".txt";
      var noisePath =  basePath + j + "-0.txt";
      countlines(noisePath, function(noiseUrls) {
        countlines(countPath, function(urls) {
          var dunnPath = basePath + j + "-dunn.txt";
          getDunn(dunnPath, config, finished, function(dunn) {
            // console.log("prej "+j);
            var eigPath = basePath + j + "-mds_eigvals";
            getEigVal(eigPath, config, finished, function(eigvalX, eigvalY, eigvalZ) {
              clusters.push({
                id: experimentId*100+j,
                experiment: experimentId,
                clusterId: j,
                urls: urls,
                noiseUrls: noiseUrls,
                dunn: dunn,
                eigvalX: eigvalX,
                eigvalY: eigvalY,
                eigvalZ: eigvalZ
              });
              n++;
              if (numbers.length == n) {
                fn(clusters);
              }
            });
          })
        });
      });
    });
  }
  else {
    fn([]);
  }
};

var FineGrainedClusterModel = model.extend({
  getFine: getFine
});

module.exports = FineGrainedClusterModel;

