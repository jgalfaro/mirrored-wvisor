var remoteHost = "http://malwurl2:3000";

window.App = Ember.Application.create();

// App.ApplicationAdapter = DS.LSAdapter; for Local Storage
// but need a web server
//App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: remoteHost
});
App.Store = DS.Store.extend();

App.DatasetController = Ember.ObjectController.extend({
  isDescriptionHidden: true,
  isRemoving: false,

  actions: {
    toggleDescriptionDataset: function() {
      this.toggleProperty("isDescriptionHidden");
    },
    removeDataset: function() {
      this.toggleProperty("isRemoving");
    },
    cancelRemoveDataset: function() {
      this.set("isRemoving", false);
    },
    confirmRemoveDataset: function() {
      var dataset = this.get("model");
      dataset.deleteRecord();
      dataset.save();
      this.set("isRemoving", false);
    },
    edit: function(datasetId) {
      this.transitionToRoute("dataset.edit", datasetId);
    }
  }
});

App.DatasetEditController = Ember.ObjectController.extend({
  actions: {
    save: function() {
      var dataset = this.get("model");
      dataset.save();
      this.transitionToRoute("datasets");
    }
  }
});

App.DatasetsController = Ember.ArrayController.extend({
  // FIXME: because we now have two controllers,
  // it doesn't work anymore
  sortProperties: ["uploadDate"],
  sortAscending: false // false = descending
});

App.DatasetsNewController = Ember.ArrayController.extend({
  isUploading: false,

  actions: {
    sendFile: function() {
      this.set("isUploading", true);
    },
    uploaded: function() {
      this.set("isUploading", false);
      // Force reloading datasets to have the new one
      this.get("store").find("dataset");
      this.transitionToRoute("datasets");
    }
  }
});

App.ExperimentController = Ember.ObjectController.extend({
  isRemoving: false,

  fineGrainedFeatures: function() {
    return this.get("fineGrained-quality-dunn")
      || this.get("fineGrained-visualization-enable");
  }.property(this.model),

  downloadPath: function() {
    return "/../experiments/" + this.get("id") + "/download";
  }.property(),

  actions: {
    edit: function(experimentId) {
      this.transitionToRoute("experiment.edit", experimentId);
    },
    removeExperiment: function() {
      this.toggleProperty("isRemoving");
    },
    cancelRemoveExperiment: function() {
      this.set("isRemoving", false);
    },
    confirmRemoveExperiment: function() {
      var experiment = this.get("model");
      experiment.deleteRecord();
      experiment.save();
      this.set("isRemoving", false);
      this.transitionToRoute("experiments.index");
    },
  }
});

App.ExperimentEditController = Ember.ObjectController.extend({
  actions: {
    save: function() {
      var experiment = this.get("model");
      experiment.save();
      this.transitionToRoute("experiment", experiment);
    }
  }
});

App.ExperimentFilebrowserController = Ember.ObjectController.extend({
  urlBrowser: function() {
    return remoteHost + "/data/experiments/" + this.get("id");
  }.property(this.model)
});

App.ExperimentIndexController = Ember.ObjectController.extend({
  isRemoving: false,

  downloadPath: function() {
    return "/../experiments/" + this.get("id") + "/download";
  }.property(),

  actions: {
    edit: function(experimentId) {
      this.transitionToRoute("experiment.edit", experimentId);
    },
    removeExperiment: function() {
      this.toggleProperty("isRemoving");
    },
    cancelRemoveExperiment: function() {
      this.set("isRemoving", false);
    },
    confirmRemoveExperiment: function() {
      var experiment = this.get("model");
      experiment.deleteRecord();
      experiment.save();
      this.set("isRemoving", false);
      this.transitionToRoute("experiments.index");
    },
  }
});

App.ExperimentSignaturesController = Ember.ObjectController.extend({
  urlSignatures: function() {
    return remoteHost + "/data/experiments/" + this.get("id") + "/signatures";
  }.property(this.model)
});

App.ExperimentsController = Ember.ArrayController.extend({
  completedNum: function () {
    return this.filterBy("finished", true).get("length");
  }.property("@each.finished"),

  inprogressNum: function () {
    return this.filterBy("finished", false)
      .filterBy("id") // remove empty experiments
      .get("length");
  }.property("@each.finished"),

  TotalNum: function(){
    return this.filterBy("id") // remove empty experiments
      .get("length");
  }.property("@each")
});

App.FineGrained2dvisualizationController = Ember.ObjectController.extend({
  selectedCluster: null,

  clusterSelected: function() {
    if (this.get("selectedCluster")) {
      var experimentId = parseInt(this.get("selectedCluster").id / 100);
      var clusterId = this.get("selectedCluster").id - experimentId*100;
      var path = remoteHost+"/data/experiments/"+experimentId+"/clusters/fine_grained/"+clusterId+"-mds.tsv";

      d3Render(path);
    }
  }.observes("selectedCluster"),

  clustersAvailable: function() {
    var fineGrainedClusters = this.get("fineGrainedClusters");
    console.log(this.get("model"));
    var availableClusters = [];
    for(var i=0; i<fineGrainedClusters.length; i++) {
      availableClusters.push(fineGrainedClusters[i]);
    }
    return this.get("fineGrainedClusters").filterProperty('eigvalY');
  }.property(),

  xinfo: function() {
    var experimentId = parseInt(this.get("selectedCluster").id / 100);
    var clusterId = this.get("selectedCluster").id - experimentId*100;
    for(var i=0; i<this.get("clustersAvailable").length; i++) {
      if (this.get("clustersAvailable")[i].id == this.get("selectedCluster").id) {
        var c = this.get("clustersAvailable").objectAt(i);
        $("span#xinfo").text(c.get("eigvalX")+"%");
        break;
      }
    }
  }.observes("selectedCluster"),

  yinfo: function() {
    var experimentId = parseInt(this.get("selectedCluster").id / 100);
    var clusterId = this.get("selectedCluster").id - experimentId*100;
    for(var i=0; i<this.get("clustersAvailable").length; i++) {
      if (this.get("clustersAvailable")[i].id == this.get("selectedCluster").id) {
        var c = this.get("clustersAvailable").objectAt(i);
        $("span#yinfo").text(c.get("eigvalY")+"%");
        break;
      }
    }
  }.observes("selectedCluster")
});

App.FineGrained3dvisualizationController = Ember.ObjectController.extend({
  downloadPath: function() {
    return "/../experiments/" + this.get("id") + "/3dvisualization/download";
  }.property()
});

App.FineGrainedQualityController = Ember.ObjectController.extend({
  urlBrowser: function(clusterId) {
    return remoteHost + "/data/experiments/" + this.get("id")
      + "/clusters/fine_grained";
  }.property(),
  // (this.model)
});

App.IndexController = Ember.ArrayController.extend({
  inprogressNum: function () {
    return this.filterBy("finished", false)
      .filterBy("id") // remove empty experiments
      .get("length");
  }.property("@each.finished")
});

App.NewExperimentController = Ember.ObjectController.extend({
  datasetEmpty: false,
  coarseGrainedClusteringAlgorithm: [
    "kmeans"
  ],
  coarseGrainedClusteringAlgorithmKmeansDistance: [
    "lettersFrequency"
  ],
  fineGrainedClusteringAlgorithm: [
    "DBScan"
  ],
  fineGrainedClusteringAlgorithmDbscanDistance: [
    "v1-KeyMat",
    "v2-KeyMatByVal"
  ],
  fineGrainedVisualizationDimensionsReduction: [
    "MDS"
  ],

  datasets: function() {
    return this.get("store").find("dataset");
  }.property(),

  actions: {
    save: function() {
      // just before saving, we set the creationDate
      this.get("model").set("progress", 0);

      // error handling where no dataset selected
      this.set("datasetEmpty",
        this.get("model").get("dataset") === null);
      if(this.get("datasetEmpty")) {
        window.scrollTo(0, 0);
      }
      else {
        this.get("model").save();
        this.transitionToRoute("index");
      }
    }
  }
});

// App = Ember.Application.create({
//   LOG_TRANSITIONS: true
// });

Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

Ember.Handlebars.helper("downloadLink", function(relativePath) {
  var url = remoteHost + "/data" + relativePath;
  var html = "<a href='" + url + "'>";
  return new Handlebars.SafeString(html);
});

Ember.Handlebars.helper("nl2br", function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return new Handlebars.SafeString(escaped.replace(/\n/g,"<br>"));
});

function d3Zoom() {
  // console.log(d3.selectAll("svg"));
  d3.selectAll("svg").selectAll("circle").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  //console.log(d3.event.scale)
  d3.selectAll("svg").selectAll("circle").attr("r", 5/d3.event.scale);
}

// render(remoteHost+"/data/experiments/14/clusters/fine_grained/0-mds.tsv");

function d3UpdateTooltip(tooltip, text) {
  d3.select("div#tooltip2").html(text);
}

function d3Render(file) {
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 1400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var x = d3.scale.linear()
    .domain([-0.5, 0.5])
    .range([0, width]);

  var y = d3.scale.linear()
      .domain([0.5, -0.5])
      .range([0, height]);

  var color = d3.scale.category10();

  d3.tsv(file, function(error, data) {

    d3.select("body").transition();

    d3.select("svg").selectAll("circle").remove();

    d3.select("svg").selectAll("circle")
        .data(data)
      .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("transform", function(d) { return "translate(" + d.x + ","+d.y+");"; })
        .style("fill", function(d) { return color(d.cluster); })
        .on("mouseover", function(d){ d3UpdateTooltip(d3.select("#tooltip"), d.cluster+'<br>'+d.url); return d3.select("#tooltip").style("visibility", "visible");})
        .on("mouseout", function(){ d3UpdateTooltip(d3.select("#tooltip"), '&nbsp;<br>&nbsp;'); return d3.select("#tooltip").style("visibility", "hidden");});

  });
}

App.Dataset = DS.Model.extend({
  name: DS.attr("string"),
  countURLs: DS.attr("number"),
  uploadDate: DS.attr("string"),
  description: DS.attr("string"),
  downloadPath: DS.attr("string")
});

App.Dataset.FIXTURES = [
  {
    id: 1,
    name: "100k-1",
    countURLs: 100000,
    uploadDate: "20/12/2013",
    description: "100k-1 description",
    downloadPath: "/toto"
  },
  {
    id: 2,
    name: "100k-2",
    countURLs: 100000,
    uploadDate: "21/12/2013",
    description: "100k-2 description",
    downloadPath: "/tata"
  },
  {
    id: 3,
    name: "100k-3",
    countURLs: 100000,
    uploadDate: "19/12/2013",
    description: "100k-3 description",
    downloadPath: "/plop"
  }
];

App.Experiment = DS.Model.extend({
  description: DS.attr("string"),
  progress: DS.attr("number"),
  dataset: DS.belongsTo("dataset"),
  creationDate: DS.attr("string"),
  finished: DS.attr("boolean", {defaultValue: false}),
  completionDate: DS.attr("string"),

  "coarseGrained-clusteringAlgorithm":
    DS.attr("string", {defaultValue: "kmeans"}),
  "coarseGrained-clusteringAlgorithm-kmeans-k":
    DS.attr("number", {defaultValue: 30}),
  "coarseGrained-clusteringAlgorithm-kmeans-distance":
    DS.attr("string", {defaultValue: "lettersFrequency"}),

  "fineGrained-clusteringAlgorithm":
    DS.attr("string", {defaultValue: "DBScan"}),
  "fineGrained-clusteringAlgorithm-dbscan-eps":
    DS.attr("number", {defaultValue: 0.5}),
  "fineGrained-clusteringAlgorithm-dbscan-k":
    DS.attr("number", {defaultValue: 3}),
  // "v1-KeyMat"
  "fineGrained-clusteringAlgorithm-dbscan-distance":
    DS.attr("string", {defaultValue: "v2-KeyMatByVal"}),
  "fineGrained-quality-dunn":
    DS.attr("boolean", {defaultValue: true}),
  "fineGrained-visualization-enable":
    DS.attr("boolean", {defaultValue: true}),
  "fineGrained-visualization-dimensionsReduction":
    DS.attr("string", {defaultValue: "MDS"}),

  "signatures-enable": DS.attr("boolean", {defaultValue: false}),

  dunnMedian: DS.attr("number"),
  dunnAverage: DS.attr("number"),
  dunnMin: DS.attr("number"),
  dunnMax: DS.attr("number"),

  fineGrainedClusters: DS.hasMany("FineGrainedCluster")
});

App.FineGrainedCluster = DS.Model.extend({
  experiment: DS.belongsTo("experiment"),
  clusterId: DS.attr("number"),
  urls: DS.attr("number"),
  noiseUrls: DS.attr("number"),
  dunn: DS.attr("number"),
  // it's not really eigen values, it's info percentage per axis
  eigvalX: DS.attr("number"),
  eigvalY: DS.attr("number"),
  eigvalZ: DS.attr("number"),
});

App.Setting = DS.Model.extend({
  key: DS.attr("string"),
  value: DS.attr("string")
});

App.Setting.FIXTURES = [
  {
    id: 1,
    key: "remoteHost",
    value: remoteHost
  },
  {
    id: 2,
    key: "key2",
    value: "value2"
  },
];

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    this.store.push("setting", {
      id: 1,
      key: "remoteHost",
      value: remoteHost
    });
  }
});

// App.Router.reopen({
//   rootURL: "/web/frontend/"
// });

App.Router.map(function() {
  this.route("new_experiment");
  this.resource("datasets", function() {
    this.route("new");
  });
  this.resource("dataset",
    { path: "/dataset/:dataset_id" },
    function() {
    this.route("edit");
  });
  this.resource("experiments", function() {
    this.route("active");
    this.route("completed");
  });
  this.resource("experiment",
    { path: "/experiment/:experiment_id" },
    function() {
    this.route("edit");
    this.route("console");
    this.route("filebrowser");
    this.resource("fine-grained",
      function() {
        this.route("quality");
        this.route("2dvisualization");
        this.route("3dvisualization");
      }
    );
    this.route("signatures");
  });
  this.resource("settings");
  this.route("about");
});

App.IndexRoute = Ember.Route.extend({
  model: function () {
    var store = this.store;

    return store.filter("experiment", { finished: false },
    function(experiment) {
      return !experiment.get("finished");
    });
  }
});

App.SettingsRoute = Ember.Route.extend({
  model: function () {
    // For fixtures
    return this.store.find("setting");
  }
});

App.DatasetsRoute = Ember.Route.extend({
  model: function () {
    // For fixtures
    return this.store.find("dataset");
  }
});

App.DatasetsIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("datasets");
  }
});

App.DatasetEditRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("dataset");
  }
});

App.NewExperimentRoute = Ember.Route.extend({
  model: function() {
    // return Ember.Object.create({
    //   datasets: this.store.find("dataset"),
    //   experiments: this.modelFor("experiment")
    // });
    return this.store.createRecord("experiment");
  // setupController: function(controller, model) {
  //   this.controllerFor("dataset").set('model', model);
  // }
  }
});

App.ExperimentsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find("experiment");
  }
});

App.ExperimentsIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("experiments");
  }
});

App.ExperimentsActiveRoute = Ember.Route.extend({
  model: function(){
    var store = this.store;
    return this.get("store").filter("experiment",
    function(experiment) {
      return !experiment.get("finished");
    });
  },
  renderTemplate: function(controller){
    this.render("experiments/index", {controller: controller});
  }
});

App.ExperimentsCompletedRoute = Ember.Route.extend({
  model: function(){
    var store = this.store;
    return this.get("store").filter("experiment",
    function(exp) {
      return exp.get("finished");
    });
  },
  renderTemplate: function(controller){
    this.render("experiments/index", {controller: controller});
  }
});

App.ExperimentEditRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("experiment");
  }
});

App.ExperimentIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("experiment");
  },
  renderTemplate: function(controller){
    //this.render("experiment/index", {controller: controller});
  }
});

App.ExperimentRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render("experiment/index", {controller: controller});
  }
});

App.ExperimentFilebrowserRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("experiment");
  }
});

App.ExperimentSignaturesRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("experiment");
  }
});

App.FineGrainedQualityRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("experiment");
  }
});

App.FineGrained2dvisualizationRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("experiment");
  }
});

App.FineGrained3dvisualizationRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("experiment");
  }
});

// From https://github.com/emberjs-addons/ember-bootstrap/blob/master/packages/ember-bootstrap/lib/views/progress_bar.js
// http://jzajpt.github.io/ember-bootstrap/

var get = Ember.get, fmt = Ember.String.fmt;

App.ProgressBar = Ember.View.extend({
  classNames: ["progress"],
  classNameBindings: ["isStriped:progress-striped", "isAnimated:active"],
  template: Ember.Handlebars.compile("<div {{bindAttr class='view.class'}} {{bindAttr style='view.style'}}></div>"),
  isAnimated: false,
  isStriped: false,
  progress: 0,

  class: Ember.computed(function() {
    var progress = get(this, "progress");
      
    if (progress == 100) {
      return "progress-bar progress-bar-success";
    }
    else {
      return "progress-bar";
    }
  }).property("progress").cacheable(),

  style: Ember.computed(function() {
    var progress = get(this, "progress");

    return fmt("width:%@%;", [progress]);
  }).property("progress").cacheable()
});

App.DatasetsNewView = Ember.View.extend({
  didInsertElement: function() {
    var that = this;
    $("form").submit(function(event) {
      event.preventDefault();
    });
    $("#file").fileupload({
      url: remoteHost + "/datasets/new",
      dataType: "json",
      add: function(e, data) {
        data.context = $("button#submit")
          .click(function() {
            data.submit();
          });
      },
      done: function(e, data) {
        that.get("controller").send("uploaded");
      },
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $("#fileprogress").css(
          "width",
          progress + "%"
        );
      }
    });
  }
});

App.ExperimentConsoleView = Ember.View.extend({
  didInsertElement: function() {
    var socket = io.connect(remoteHost+"/console");
    var url = document.URL;
    var stdout = "";
    var stderr = "";
    url = url.split('/');

    // clean up previous console
    $("#stdout").html("");
    $("#stderr").html("");

    socket.emit("console_load_experiment",
      parseInt(url[url.length-2]));
    socket.on("stdout", function (data) {
      stdout += data;
      // XXX: to have app less janky
      setTimeout(function(){
        $("#stdout").html(stdout);
      },500);
    });
    socket.on("stderr", function (data) {
      stderr += data;
      /// XXX: to have app less janky
      setTimeout(function(){
        $("#stderr").html(stderr);
      },500);
    });
  }
});

App.ExperimentIndexView = Ember.View.extend({
  didInsertElement: function() {
    var socket = io.connect(remoteHost+"/progress");

    var experiments = $("div.experiment");
    for(var i = 0; i<experiments.length; i++) {
      socket.emit("progress_load_experiment", experiments[i].id);
    }

    socket.on("progress", function (data) {
      // console.log("progress "+data.rid+" "+data.progress);

      // update progress bar
      $("div#"+data.rid+".container.experiment"
        + "> .row > .progress > .progress-bar")
        .css("width", data.progress);

      // update status if finished
      if (data.progress == "100%") {
        // green bar
        $("div#"+data.rid+".container.experiment"
          +"> .row > .progress > .progress-bar")
          .addClass("progress-bar-success");
      }
    });
  }
});

App.ExperimentsIndexView = Ember.View.extend({
  didInsertElement: function() {
    var socket = io.connect(remoteHost+"/progress");

    var experiments = $("div.experiment");
    for(var i = 0; i<experiments.length; i++) {
      socket.emit("progress_load_experiment", experiments[i].id);
    }

    socket.on("progress", function (data) {
      // console.log("progress "+data.rid+" "+data.progress);

      // update progress bar
      $("div#"+data.rid+".container.experiment"
        + "> .row > .progress > .progress-bar")
        .css("width", data.progress);

      // update status if finished
      if (data.progress == "100%") {
        // green bar
        $("div#"+data.rid+".container.experiment"
          +"> .row > .progress > .progress-bar")
          .addClass("progress-bar-success");
      }
    });
  }
});

App.FineGrained2dvisualizationView = Ember.View.extend({
  didInsertElement: function() {

    $("div.experiment").hide();
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 1400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // .style("margin-left", "200px")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", d3Zoom));

    var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "-10")
      .style("margin-left", "200px")
      .style("visibility", "hidden")
      .attr("id", "tooltip")
      .text("");

    var rect = svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height);
  },

  willDestroy: function() {
    $("svg").remove();
    $("#tooltip").remove();
    $("div.experiment").show();
  }
});

App.IndexView = Ember.View.extend({
  templateName: "index",
  didInsertElement: function() {
    // htop

    /**
     * Display a message
     * @param {String} type - the message type in info,
     * alert, warn, etc.
     * @param {String} text - the message
     * @param {Boolean} clear - clear the msg box
     */
    function msg(type, text, clear){
      var $msgBox = $("#messages");
      if(clear === true){
        $msgBox.empty();
      }
      $msgBox.append("<p class='text-"+type+"'>"+text+"</p>");
    }

    /**
     * Change the state of the controls btns
     */
    function toggleCtrlState(){
      $(".controls .btn").toggleClass("disabled");
    }

    /**
     * Request informations about system
     * @param {Function} cb - executed once the infos are retrieved
     */
    function getSysInfos(cb){
      $.getJSON(remoteHost + "/sysinfos", function(data){
        if(data){
          $("#sysinfo > #hostname").text(data.hostname);
          $("#sysinfo > #type").text(data.type);
          $("#sysinfo > #arch").text(data.arch);
          $("#sysinfo > #release").text(data.release);
          $("#cpus > .count").text(data.cpus.count);
          $("#cpus > .model").text(data.cpus.model);
          cb();
        }
      });
    }

    /**
     * Helps you to translate stats to ui widgets
     * @class
     */
    var StatDisplayer = {
      /**
       * store the jquery elements for each stat widget
       * @type {Object}
       */
      _containers: {
        uptime: $("#uptime > .value"),
        loadP1: $("#loadavg .p1"),
        loadP5: $("#loadavg .p5"),
        loadP15: $("#loadavg .p15"),
        memPerUsed: $("#mem .perUsed"),
        memUsed: $("#mem .used"),
        memTotal: $("#mem .total"),
        memBar: $("#mem > .progress > .progress-bar-info"),
        nodePerUsed: $("#node-mem .perUsed"),
        nodeUsed: $("#node-mem .used"),
        nodeTotal: $("#node-mem .total"),
        nodeBar: $("#node-mem > .progress > .progress-bar-info"),
        swapPerUsed: $("#swap .perUsed"),
        swapUsed: $("#swap .used"),
        swapTotal: $("#swap .total"),
        swapBar: $("#swap > .progress > .progress-bar-info")
      },

      /**
       * zero prepender
       * @private
       * @param {Number} i - the number to be zero prepended
       * @returns {Strin} the number to display
       */
      _zprep: function(i){
        return (i >= 0 && i < 10) ? "0" + i : i;
      },

      /**
       * round to the decimal
       * @private
       * @param {Number} i - the input number
       * @param {Number} i - the number of decimals
       * @returns {Number} the output
       */
      _dec: function(i, num){
        var f = Math.pow(10, num);
        return Math.round(i * f) / f;
      },

      /**
       * display the uptime
       * @param {Object} values - the stats
       */
      uptime: function(values){
        var h = Math.floor(values.uptime / 3600),
          m = Math.floor((values.uptime / 60) % 60),
          s = values.uptime % 60;
        this._containers.uptime.text(this._zprep(h) + ":"
          + this._zprep(m) + ":" + this._zprep(s));
      },

      /**
       * display the load avg
       * @param {Object} values - the stats
       */
      load: function(values){
        this._containers.loadP1.text(this._dec(values.p1, 2));
        this._containers.loadP5.text(this._dec(values.p5, 2));
        this._containers.loadP15.text(this._dec(values.p15, 2));
      },
          
      /**
       * display the memory
       * @param {Object} values - the stats
       */
      mem: function(values){
        var mu = values.memtotal - values.memfree,
          mpu = this._dec(((mu * 100) / values.memtotal), 1),
          su = values.swaptotal - values.swapfree,
          spu = this._dec(((su * 100) / values.swaptotal), 1),
          muFormat = this._dec(mu/1024, 0),
          mtFormat =  this._dec(values.memtotal/1024, 0),
          suFormat = this._dec(su/1024, 0),
          stFormat =  this._dec(values.swaptotal/1024, 0);
        this._containers.memPerUsed.text(mpu);
        this._containers.memUsed.text(muFormat);
        this._containers.memTotal.text(mtFormat);
        this._containers.memBar.width(mpu + "%");
        this._containers.swapPerUsed.text(spu);
        this._containers.swapUsed.text(suFormat);
        this._containers.swapTotal.text(stFormat);
        this._containers.swapBar.width(spu + "%");
      },
          
      "node-mem": function(values){
        var mu = values.heapUsed,
          mpu = this._dec(((mu * 100) / values.heapTotal), 1),
          muFormat = this._dec(mu/(1024*1024), 0),
          mtFormat = this._dec(values.heapTotal/(1024*1024), 0);
        this._containers.nodePerUsed.text(mpu);
        this._containers.nodeUsed.text(muFormat);
        this._containers.nodeTotal.text(mtFormat);
        this._containers.nodeBar.width(mpu + "%");
      },
    };

    //keep the socket instance
    var statSock = null;
      
    /**
     * Start stat retrieving using a web socket
     */
    function start(){
      if(statSock === null){
        statSock = io.connect(remoteHost + "/stat");
        statSock.on("stat", function (data) {
          var displayer = StatDisplayer[data.type];
          if(typeof displayer === "function"){
            displayer.call(StatDisplayer, data.values);
          }
        });
      } else {
        statSock.socket.reconnect();
      }
      statSock.on("connect", function(){
        msg("success", "Retrieving data...", true);
      });
    }
      
    /**
     * Stop stat retrieval
     */
    function stop(){
      if(statSock){
        statSock.socket.disconnect();
        msg("info", "Stopped", true);
      }
    }
      
    //sequential
      
    msg("info", "Retrieving system infos...");
      
    //get system data
    getSysInfos(function(){
      $("#start").removeClass("disabled");
      msg("info", "Ready", true);
    });
      
    //bind start
    // $("#start").click(function(){
      toggleCtrlState();
      start();
      // return false;
    // });
      
    //bind stop
    // $("#stop").click(function(){
      // toggleCtrlState();
      // stop();
      // return false;
    // });

    // experiments progress bars
    var socket = io.connect(remoteHost+"/progress");

    var experiments = $("div.experiment");
    for(var i = 0; i<experiments.length; i++) {
      socket.emit("progress_load_experiment", experiments[i].id);
    }

    socket.on("progress", function (data) {
      // console.log("progress "+data.rid+" "+data.progress);

      // update progress bar
      $("div#"+data.rid+".container.experiment"
        + "> .row > .progress > .progress-bar")
        .css("width", data.progress);

      // update status if finished
      if (data.progress == "100%") {
        // green bar
        $("div#"+data.rid+".container.experiment"
          +"> .row > .progress > .progress-bar")
          .addClass("progress-bar-success");
      }
    });
  }
});

App.NumberField = Ember.TextField.extend({
  type: "number",
  attributeBindings: ["required"],
  required: null
});
