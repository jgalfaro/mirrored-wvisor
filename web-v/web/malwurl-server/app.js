/*jshint multistr: true */

//first of all initialize the logger
var lf = require("./lib/logFactory").LogFactory;
var logger = lf.init(lf.levels.debug, true, "./logs/node-htop.log");

/**
 * Module dependencies.
 */

var express = require("express");
var socketio = require("socket.io");
var http = require("http");
var path = require("path");
var fs = require("fs");
var directory = require("./vendor/connect/lib/middleware/directory");

var controllers = require("./controllers");

/*
 * DB setup
 */

var dbFile = "public/data/malwurl.sqlite3";
var dbFileExists = fs.existsSync(dbFile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFile);
db.serialize(function() {
  if(!dbFileExists) {
    db.run("CREATE TABLE datasets ( \
      name VARCHAR(250), \
      countURLs BIGINT, \
      uploadDate VARCHAR(250), \
      description TEXT, \
      downloadPath VARCHAR(250) \
    );");
    /*
    CREATE TABLE experiments (
    description TEXT,
    progress INT,
    dataset INT,
    creationDate VARCHAR(250),
    finished TINYINT,
    completionDate VARCHAR(250)
    );
    */
    db.run("CREATE TABLE experiments ( \
      description TEXT, \
      progress INT, \
      dataset INT, \
      creationDate VARCHAR(250), \
      finished TINYINT, \
      completionDate VARCHAR(250) \
    );");
  }
});
var attachDB = function(req, res, next) {
  req.db = db;
  next();
};

var app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");
app.use(express.favicon());
app.use(function logRequest(req, res, next){
  logger.log("info", require("util").inspect(req.url)
    + " by process " + process.id);
  next();
});
app.use(express.json({limit: "10000mb"}));
app.use(express.urlencoded({limit: "10000mb"}));
// Parse POST data
app.use(express.bodyParser({limit: "10000mb"}));
app.use(express.methodOverride());
app.use(express.cookieParser("your secret here"));
app.use(express.session());
app.use(app.router);
app.use(require("less-middleware") ({
  src: path.join(__dirname, "public")
}));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

app.use(express.static(path.join(__dirname, "public")));
express.directory2 = directory;
app.use(express.directory2(path.join(__dirname, "public"),
  {icons: true}));

// development only
if ("development" === app.get("env")) {
  app.use(express.errorHandler());
}

// routes
app.all("/settings", controllers.settings.run);

app.all("/datasets/new", attachDB, controllers.datasets.new.run);
app.get("/datasets", attachDB, controllers.datasets.list.run);
app.get("/datasets/:dataset_id", attachDB,
  controllers.datasets.show.run);
app.options("/datasets/:dataset_id", attachDB,
  controllers.datasets.edit.run);
app.put("/datasets/:dataset_id", attachDB,
  controllers.datasets.edit.run);
app.delete("/datasets/:dataset_id", attachDB,
  controllers.datasets.delete.run);

app.get("/experiments", attachDB, controllers.experiments.list.run);
app.options("/experiments", attachDB, controllers.experiments.new.run);
app.post("/experiments", attachDB, controllers.experiments.new.run);
app.get("/experiments/:experiment_id", attachDB,
  controllers.experiments.show.run);
app.options("/experiments/:experiment_id", attachDB,
  controllers.experiments.edit.run);
app.put("/experiments/:experiment_id", attachDB,
  controllers.experiments.edit.run);
app.get("/experiments/:experiment_id/download", attachDB,
  controllers.experiments.download.run);
app.delete("/experiments/:experiment_id", attachDB,
  controllers.experiments.delete.run);
app.get("/experiments/:experiment_id/3dvisualization/download", attachDB,
  controllers.experiments.download3dvisualization.run);

var httpServer = http.createServer(app).listen(
  app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
var io = socketio.listen(httpServer, {logger : logger});

// htop
controllers.htop.sysinfos(app);
controllers.htop.stat(io);

controllers.experiments.console(io);
controllers.experiments.progress(db, io);

// http://nodejs.org/api.html#_child_processes
// var sys = require("sys")
// var exec = require("child_process").exec;
// var childData = [];
// var command = "while [ 1 ]; do echo "1"; sleep 1; done";
// var child = exec(command, function (error, stdout, stderr) {
//   sys.print("stdout: " + stdout);
//   sys.print("stderr: " + stderr);
//   if (error !== null) {
//     console.log("exec error: " + error);
//   }
// });

io.sockets.on("connection", function(socket){
  //call function for connect and send the socket and data
  socket.on("connect", function(data){
    controllers.io.connect(socket, data);
  });

  //event when a client disconnects from the app
  socket.on("disconnect", function(){
    controllers.io.disconnect(socket);
  });

  // child.stdout.addListener("data", function(data) {
  //   console.log(childData);
  //   childData.push(data);
  //   socket.emit("data", childData);
  // });
});
