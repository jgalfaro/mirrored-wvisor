/*jshint multistr: true */

var fs = require("fs");
var settings = require("../settings.js");
var Model = require("./base");
var model = new Model();
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var tmux = require("../lib/tmux")("malwurl-server");

function median(values) {
  values.sort( function(a,b) {return a - b;} );

  var half = Math.floor(values.length/2);

  if(values.length % 2)
    return values[half];
  else
    return (values[half-1] + values[half]) / 2.0;
}

var getQualityExperiment = function(data, fn) {
  var coarseNum = data["coarseGrained-clusteringAlgorithm-kmeans-k"];
  if (data["fineGrained-quality-dunn"]) {
    var arr = [];
    for(var i=0; i < coarseNum; i++) {
      var cluster_path = settings.dataPath + "experiments/"
        + data.id + "/clusters/fine_grained/" + i + "-dunn.txt";
      if (fs.existsSync(cluster_path)) {
        var dunnData = fs.readFileSync(cluster_path).toString();
        var match = dunnData.match(/dunn: (\d+\.\d+)/);
        if (match) {
          arr.push(parseFloat(match[1]));
        }
      }
    }
    arr = arr.sort(function(a,b) { return a - b;});
    data.dunnMin = arr[0];
    data.dunnMax = arr[arr.length-1];
    data.dunnAverage = arr[parseInt(arr.length/2)];
    data.dunnMedian = median(arr);
  }
  if ((data["fineGrained-visualization-enable"] && 
    data["fineGrained-visualization-dimensionsReduction"] == "MDS")
    || data["fineGrained-quality-dunn"]) {
    data.fineGrainedClusters = []
    for(var i=0; i<coarseNum; i++) {
      data.fineGrainedClusters.push(data.id*100+i);
    }
  }
  fn(data);
}

var ExperimentModel = model.extend({
  isNotFinished: function(db, experimentId, fn) {
    db.get("SELECT * FROM experiments \
      WHERE rowid="+experimentId, function(err, row) {
        if (row.finished == 0) {
          fn(row);
        }
      }
    );
  },
  getLastIdExperiment: function(db, fn) {
    db.get("SELECT rowid FROM experiments \
      ORDER BY rowid DESC", function(err, row) {
      console.log(err);
      if (row) {
        fn(row.rowid);
      }
      else {
        fn(0);
      }
    });
  },
  insertExperiment: function(db, experiment) {
    experiment.finished = experiment.finished ? 1 : 0;

    var date = new Date();
    db.run("INSERT INTO experiments( \
      description, \
      progress, \
      dataset, \
      creationDate, \
      finished, \
      completionDate) \
      VALUES ( \
      '"+experiment.description+"', \
      "+experiment.progress+", \
      "+experiment.dataset+", \
      '"+date+"', \
      "+experiment.finished+", \
      '"+experiment.completionDate+"')");
    this.getLastIdExperiment(db, function(lastId) {
      var expPath = settings.dataPath + "experiments/" + lastId;
      // Create experiment directory
      fs.mkdir(expPath, function() {
        // Copy dataset into this directory
        var dataPath = settings.dataPath + "datasets/"
          + experiment.dataset + ".txt";
        var targetPath = expPath + "/dataset.txt";
        var stream = fs.createReadStream(dataPath);
        stream.pipe(fs.createWriteStream(targetPath));
        // wait for the dataset to finish copying
        stream.on("close", function(){
          // Create json config file in directory
          var configPath = expPath + "/config.json";
          fs.writeFileSync(configPath, JSON.stringify(experiment));
          // Launch scripts
          tmux.run(settings.malwurlPath+"/webLaunch.py "+lastId,
            "exp"+lastId,
            expPath+"/stdout.log",
            expPath+"/stderr.log");
        });
      });
    });
  },
  getAllExperiments: function(db, fn) {
    var results = [];
    // get ids and metainfo of all experiments
    db.all("SELECT rowid as id, description, progress, dataset, \
      creationDate, finished, completionDate \
      FROM experiments", function(err, rows) {
      // then load their build info
      for(var row in rows) {
        row = rows[row];
        var configPath = settings.dataPath + "experiments/"
          + row.id + "/config.json";
        console.log(configPath);
        if (fs.existsSync(configPath)) {
          var data = fs.readFileSync(configPath);
          data = JSON.parse(data);
          // db data as more fresh than json file for these attributes
          data.id = row.id;
          data.description = row.description;
          data.progress = row.progress;
          data.dataset = row.dataset;
          data.creationDate = row.creationDate;
          data.finished = row.finished ? true : false;
          data.completionDate = row.completionDate;
          getQualityExperiment(data, function(newData) {
            data = newData;
          })
        }
        results.push(data);
     }
     fn(results);
    });
  },
  getExperiment: function(db, experimentId, fn) {
   db.get("SELECT rowid as id, description, progress, dataset, \
      creationDate, finished, completionDate \
      FROM experiments WHERE rowid = "+experimentId,
      function(err, row) {
      // then load their build info
      var configPath = settings.dataPath + "experiments/"
        + row.id + "/config.json";
      console.log(configPath);
      var data = fs.readFileSync(configPath);
      data = JSON.parse(data);
      // db data as more fresh than json file for these attributes
      data.id = row.id;
      data.description = row.description;
      data.progress = row.progress;
      data.dataset = row.dataset;
      data.creationDate = row.creationDate;
      data.finished = row.finished ? true : false;
      data.completionDate = row.completionDate;
      getQualityExperiment(data, function(newData) {
        data = newData;
      })
      fn(data);
    });
  },
  editExperiment: function(db, metainfo, experimentId) {
    metainfo.finished = metainfo.finished ? 1 : 0;

    db.run("UPDATE experiments SET \
      description = '" + metainfo.description + "', \
      progress = '" + metainfo.progress + "', \
      finished = " + metainfo.finished +", \
      completionDate = '" + metainfo.completionDate +"' \
      WHERE rowid=" + experimentId);
  },
  deleteExperiment: function(db, experimentId) {
   db.get("SELECT finished FROM experiments WHERE rowid = "+experimentId,
      function(err, row) {
        if (!row.finished) {
          // cancel experiment
          tmux.kill("exp"+experimentId);
        }
        // remove data
        db.run("DELETE FROM experiments WHERE rowid = "+experimentId);

        var expPath = settings.dataPath + "experiments/"
          + experimentId;
        expPath += " " + expPath + ".zip " + expPath + "-3dvisualization.zip";
        var child = exec("rm -rf " + expPath ,function(err,out) { 
          console.log(out);
          console.log(err); 
        });
    });
  },
  downloadExperiment: function(experimentId, fn) {
    var srcPath = settings.dataPath + "experiments/"
      + experimentId;
    var targetPath = settings.dataPath + "experiments/"
      + experimentId + ".zip";
    var zip = spawn("zip", ["-r", targetPath, srcPath]);

    zip.stdout.on("data", function(data) {
      console.log(data.toString());
    });

    zip.on("exit", function(code) {
      console.log("Child process exited with code:", code);
      fn();
    });
  },
  download3dvisualization: function(experimentId, fn) {
    var execFile = require('child_process').execFile;
    console.log(experimentId);
    console.log(settings.dataPath+'experiments/'+experimentId);
    // find web/malwurl-server/public/data/experiments/9 -name "*.tsv"
    execFile('find', [ settings.dataPath+'experiments/'+experimentId, "-name", '*.tsv' ],
      function(err, stdout, stderr) {
      var fileList = stdout.split('\n');
      console.log(fileList);
      /* now you've got a list with full path file names */

      var targetPath = ["-r", settings.dataPath + "experiments/"
        + experimentId + "-3dvisualization.zip"];

      console.log(targetPath.concat(fileList));
      var zip = spawn("zip", targetPath.concat(fileList));

      zip.stdout.on("data", function(data) {
        console.log(data.toString());
      });

      zip.on("exit", function(code) {
        console.log("Child process exited with code:", code);
        fn();
      });
    });
  },
});
module.exports = ExperimentModel;
