/*jshint multistr: true */

var Model = require("./base");
var model = new Model();

var DatasetModel = model.extend({
  name: "Dataset",
  getLastIdDataset: function(db, fn) {
    db.get("SELECT rowid FROM datasets \
      ORDER BY rowid DESC", function(err, row) {
      if (row) {
        fn(row.rowid);
      }
      else {
        fn(0);
      }
    });
  },
  insertDataset: function(db, dataset) {
    db.run("INSERT INTO datasets( \
      name, \
      countURLs, \
      uploadDate, \
      description, \
      downloadPath) \
      VALUES ( \
      '"+dataset.name+"', \
      "+dataset.countURLs+", \
      '"+dataset.uploadDate+"', \
      '"+dataset.description+"', \
      '"+dataset.downloadPath+"')");
  },
  getAllDatasets: function(db, fn) {
    db.get("SELECT COUNT(*) as c FROM datasets", function(err, row) {
      console.log(err);
      if (row.c > 0) {
        db.all("SELECT rowid as id, name, countURLs, uploadDate, \
        description, downloadPath FROM datasets", function(err, rows) {
          fn(rows);
        });
      }
      else {
        fn([]);
      }
    });
  },
  getDataset: function(db, datasetId, fn) {
    db.get("SELECT rowid as id, name, countURLs, uploadDate, \
    description, downloadPath FROM datasets \
    WHERE rowid = "+datasetId, function(err, row) {
      fn(row);
    });
  },
  editDataset: function(db, dataset, datasetId) {
    db.run("UPDATE datasets SET \
      name = '" + dataset.name + "', \
      description = '" + dataset.description + "' \
      WHERE rowid="+datasetId);
  },
  deleteDataset: function(db, datasetId) {
    db.run("DELETE FROM datasets WHERE rowid = "+datasetId);
  }
});
module.exports = DatasetModel;
