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
