this["Ember"] = this["Ember"] || {};
this["Ember"]["TEMPLATES"] = this["Ember"]["TEMPLATES"] || {};

this["Ember"]["TEMPLATES"]["_experimentItem"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n  <div class=\"container experiment\" ");
  hashContexts = {'id': depth0};
  hashTypes = {'id': "ID"};
  options = {hash:{
    'id': ("id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n    <h4>\n      ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiment", "id", options) : helperMissing.call(depth0, "link-to", "experiment", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </h4>\n    <div class=\"col-md-4 row\">\n      ");
  hashContexts = {'isAnimated': depth0,'isStriped': depth0,'progress': depth0};
  hashTypes = {'isAnimated': "BOOLEAN",'isStriped': "BOOLEAN",'progress': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ProgressBar", {hash:{
    'isAnimated': (true),
    'isStriped': (true),
    'progress': ("progress")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n    <div class=\"col-md-6\">\n      <button type=\"button\" class=\"btn btn-success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "edit", "id", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        <span class=\"glyphicon glyphicon-pencil\"></span>\n        Edit\n      </button>\n      ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.downloadLink || depth0.downloadLink),stack1 ? stack1.call(depth0, "downloadPath", options) : helperMissing.call(depth0, "downloadLink", "downloadPath", options))));
  data.buffer.push("\n        <button type=\"button\" class=\"btn btn-primary\">\n          <span class=\"glyphicon glyphicon-cloud-download\"></span>\n          Download data\n        </button>\n      </a>\n      ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isRemoving", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </div>\n    <div class=\"col-md-2\">\n      ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiment.console", "id", options) : helperMissing.call(depth0, "link-to", "experiment.console", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </div>\n    <div class=\"col-md-12\">\n      <div class=\"col-md-6\">\n        <ul>\n          <li>Dataset: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "dataset.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n          <li>Started: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "creationDate", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n          <li>Finished: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "completionDate", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n          <li>Description:<br>\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.nl2br || depth0.nl2br),stack1 ? stack1.call(depth0, "description", options) : helperMissing.call(depth0, "nl2br", "description", options))));
  data.buffer.push("\n          </li>\n        </ul>\n      </div>\n      <div class=\"col-md-6\">\n        <ul>\n          <li>\n            Coarse-Grained Clustering\n            <ul>\n              <li>\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "coarseGrained-clusteringAlgorithm", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                <ul>\n                  <li>k = ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "coarseGrained-clusteringAlgorithm-kmeans-k", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n                  <li>distance: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "coarseGrained-clusteringAlgorithm-kmeans-distance", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n                </ul>\n              </li>\n            </ul>\n          </li>\n          <li>\n            Fine-Grained Clustering\n            <ul>\n              <li>\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "fineGrained-clusteringAlgorithm", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                <ul>\n                  <li>eps = ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "fineGrained-clusteringAlgorithm-dbscan-eps", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n                  <li>k = ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "fineGrained-clusteringAlgorithm-dbscan-k", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n                  <li>distance: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "fineGrained-clusteringAlgorithm-dbscan-distance", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n                </ul>\n              </li>\n              <li>\n                Quality\n                <ul>\n                  <li>Dunn Index: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "fineGrained-quality-dunn", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n                </ul>\n              </li>\n              <li>\n                Visualization\n                <ul>\n                  <li>Enable: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "fineGrained-visualization-enable", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n                  <li>Dimensions Reduction Algorithm: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "fineGrained-visualization-dimensionsReduction", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n                </ul>\n              </li>\n            </ul>\n          </li>\n          <li>\n            Signatures: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "signatures-enable", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        Experiment #");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <button type=\"button\" class=\"btn btn-danger\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmRemoveExperiment", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          I really want to delete\n        </button>\n        <button type=\"button\" class=\"btn btn-default\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelRemoveExperiment", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          Cancel\n        </button>\n      ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "finished", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          <button type=\"button\" class=\"btn btn-danger\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeExperiment", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            <span class=\"glyphicon glyphicon-remove-circle\"></span>\n            Remove\n          </button>\n        ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          <button type=\"button\" class=\"btn btn-danger\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeExperiment", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            <span class=\"glyphicon glyphicon-remove-circle\"></span>\n            Cancel\n          </button>\n        ");
  return buffer;
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\n        Live console output\n      ");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "id", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

this["Ember"]["TEMPLATES"]["about"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("This research project aims at using Machine Learning techniques identify and group URLs used by malware.<br>\n\nThis is a joint project between Telecom SudParis and Orange Labs.\n");
  
});

this["Ember"]["TEMPLATES"]["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"navbar navbar-inverse\" role=\"navigation\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">Malwurl</a>\n    </div>\n    <div class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li>\n          ");
  hashContexts = {'activeClass': depth0};
  hashTypes = {'activeClass': "STRING"};
  options = {hash:{
    'activeClass': ("active")
  },contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "In Progress", "index", options) : helperMissing.call(depth0, "link-to", "In Progress", "index", options))));
  data.buffer.push("\n        </li>\n        <li>\n          ");
  hashContexts = {'activeClass': depth0};
  hashTypes = {'activeClass': "STRING"};
  options = {hash:{
    'activeClass': ("active")
  },contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "New experiment", "new_experiment", options) : helperMissing.call(depth0, "link-to", "New experiment", "new_experiment", options))));
  data.buffer.push("\n        </li>\n        <li>\n          ");
  hashContexts = {'activeClass': depth0};
  hashTypes = {'activeClass': "STRING"};
  options = {hash:{
    'activeClass': ("active")
  },contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Datasets", "datasets.index", options) : helperMissing.call(depth0, "link-to", "Datasets", "datasets.index", options))));
  data.buffer.push("\n        </li>\n        <li>\n          ");
  hashContexts = {'activeClass': depth0};
  hashTypes = {'activeClass': "STRING"};
  options = {hash:{
    'activeClass': ("active")
  },contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Experiments", "experiments", options) : helperMissing.call(depth0, "link-to", "Experiments", "experiments", options))));
  data.buffer.push("\n        </li>\n        <li>\n          ");
  hashContexts = {'activeClass': depth0};
  hashTypes = {'activeClass': "STRING"};
  options = {hash:{
    'activeClass': ("active")
  },contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "Settings", "settings", options) : helperMissing.call(depth0, "link-to", "Settings", "settings", options))));
  data.buffer.push("\n        </li>\n        <li>\n          ");
  hashContexts = {'activeClass': depth0};
  hashTypes = {'activeClass': "STRING"};
  options = {hash:{
    'activeClass': ("active")
  },contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "About", "about", options) : helperMissing.call(depth0, "link-to", "About", "about", options))));
  data.buffer.push("\n        </li>\n      </ul>\n    </div><!--/.nav-collapse -->\n  </div>\n</div>\n<div class=\"container\">\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["dataset/edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        <button type=\"button\" class=\"btn btn-default\">\n          <span class=\"glyphicon glyphicon-circle-arrow-left\"></span>\n          Go back\n        </button>\n      ");
  }

  data.buffer.push("<div class=\"page-header\">\n    <h2>Edit dataset #");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2>\n</div>\n\n\n<form class=\"form-horizontal\" role=\"form\">\n  <div class=\"form-group\">\n    <label for=\"name\" class=\"col-sm-2 control-label\">Name</label>\n    <div class=\"col-sm-10\">\n      ");
  hashContexts = {'type': depth0,'class': depth0,'name': depth0,'id': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'name': "STRING",'id': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'name': ("name"),
    'id': ("name"),
    'placeholder': ("Name"),
    'value': ("name")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"description\" class=\"col-sm-2 control-label\">Description</label>\n    <div class=\"col-sm-10\">\n      ");
  hashContexts = {'class': depth0,'name': depth0,'id': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'class': "STRING",'name': "STRING",'id': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'class': ("form-control"),
    'name': ("description"),
    'id': ("description"),
    'placeholder': ("Description"),
    'value': ("description")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || depth0.textarea),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"col-sm-offset-2 col-sm-10\">\n      <button id=\"submit\" class=\"btn btn-success\"  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        Submit\n      </button>\n      <br><br>\n      ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "datasets", options) : helperMissing.call(depth0, "link-to", "datasets", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </div>\n  </div>\n</form>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["datasets"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["datasets/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <button class=\"btn btn-success\">\n    <span class=\"glyphicon glyphicon-cloud-upload\"></span>\n    Upload a new dataset\n  </button>\n");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n      <tr>\n        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "countURLs", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n        <td>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "uploadDate", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n        <td>\n          <button type=\"button\" class=\"btn btn-info\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleDescriptionDataset", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            <span class=\"glyphicon glyphicon-info-sign\"></span>\n            Description\n          </button>\n          <button type=\"button\" class=\"btn btn-success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "edit", "id", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            <span class=\"glyphicon glyphicon glyphicon-pencil\"></span>\n            Edit\n          </button>\n          ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.downloadLink || depth0.downloadLink),stack1 ? stack1.call(depth0, "downloadPath", options) : helperMissing.call(depth0, "downloadLink", "downloadPath", options))));
  data.buffer.push("\n            <button type=\"button\" class=\"btn btn-primary\">\n              <span class=\"glyphicon glyphicon-cloud-download\"></span>\n              Download\n            </button>\n          </a>\n          ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isRemoving", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </td>\n      </tr>\n      <tr ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":warning isDescriptionHidden:hide")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n        <td colspan=\"4\">\n          ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.nl2br || depth0.nl2br),stack1 ? stack1.call(depth0, "description", options) : helperMissing.call(depth0, "nl2br", "description", options))));
  data.buffer.push("\n        </td>\n      </tr>\n    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            <button type=\"button\" class=\"btn btn-danger\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmRemoveDataset", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n              I really want to delete\n            </button>\n            <button type=\"button\" class=\"btn btn-default\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelRemoveDataset", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n              Cancel\n            </button>\n          ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            <button type=\"button\" class=\"btn btn-danger\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeDataset", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n              <span class=\" glyphicon glyphicon-remove-circle\"></span>\n              Delete\n            </button>\n          ");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "datasets.new", options) : helperMissing.call(depth0, "link-to", "datasets.new", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n<br><br>\n\n<table class=\"table table-hover\">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>URLs</th>\n      <th>Uploaded on</th>\n      <th></th>\n    </tr>\n  </thead>\n  <tbody>\n    ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack2 = helpers.each.call(depth0, {hash:{
    'itemController': ("dataset")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </tbody>\n</table>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["datasets/new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"progress progress-striped active\">\n      <div id=\"fileprogress\" class=\"progress-bar\"  role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 0%\">\n      </div>\n    </div>\n  ");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <button id=\"submit\" class=\"btn btn-success\"  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendFile", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          Send\n        </button>\n        <input type=\"reset\" value=\"Reset\" class=\"btn btn-default\">\n      ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n        <button type=\"button\" class=\"btn btn-default\">\n          <span class=\"glyphicon glyphicon-circle-arrow-left\"></span>\n          Go back\n        </button>\n      ");
  }

  data.buffer.push("<div class=\"page-header\">\n    <h2>Upload a new dataset</h2>\n</div>\n\n<form class=\"form-horizontal\" role=\"form\">\n  <div class=\"form-group\">\n    <label for=\"file\" class=\"col-sm-2 control-label\">File</label>\n    <div class=\"col-sm-10\">\n      ");
  hashContexts = {'type': depth0,'name': depth0,'id': depth0,'disabled': depth0};
  hashTypes = {'type': "STRING",'name': "STRING",'id': "STRING",'disabled': "ID"};
  options = {hash:{
    'type': ("file"),
    'name': ("file"),
    'id': ("file"),
    'disabled': ("isUploading")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"name\" class=\"col-sm-2 control-label\">Name</label>\n    <div class=\"col-sm-10\">\n      ");
  hashContexts = {'type': depth0,'class': depth0,'name': depth0,'id': depth0,'placeholder': depth0,'disabled': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'name': "STRING",'id': "STRING",'placeholder': "STRING",'disabled': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'name': ("name"),
    'id': ("name"),
    'placeholder': ("Name"),
    'disabled': ("isUploading")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"description\" class=\"col-sm-2 control-label\">Description</label>\n    <div class=\"col-sm-10\">\n      ");
  hashContexts = {'class': depth0,'name': depth0,'id': depth0,'placeholder': depth0,'disabled': depth0};
  hashTypes = {'class': "STRING",'name': "STRING",'id': "STRING",'placeholder': "STRING",'disabled': "ID"};
  options = {hash:{
    'class': ("form-control"),
    'name': ("description"),
    'id': ("description"),
    'placeholder': ("Description"),
    'disabled': ("isUploading")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || depth0.textarea),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n  </div>\n  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isUploading", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  <div class=\"form-group\">\n    <div class=\"col-sm-offset-2 col-sm-10\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "isUploading", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      <br><br>\n      ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "datasets", options) : helperMissing.call(depth0, "link-to", "datasets", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </div>\n  </div>\n</form>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["experiment/console"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"row\">\n  <div class=\"col-md-6\">\n    <h2>stdout</h2>\n    <div id=\"stdout\"></div>\n  </div>\n  <div class=\"col-md-6\">\n    <h2>stderr</h2>\n    <div id=\"stderr\"></div>\n  </div>\n</div>");
  
});

this["Ember"]["TEMPLATES"]["experiment/edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        <button type=\"button\" class=\"btn btn-default\">\n          <span class=\"glyphicon glyphicon-circle-arrow-left\"></span>\n          Go back\n        </button>\n      ");
  }

  data.buffer.push("<div class=\"page-header\">\n    <h2>Edit experiment #");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2>\n</div>\n\n\n<form class=\"form-horizontal\" role=\"form\">\n  <div class=\"form-group\">\n    <label for=\"description\" class=\"col-sm-2 control-label\">Description</label>\n    <div class=\"col-sm-10\">\n      ");
  hashContexts = {'class': depth0,'name': depth0,'id': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'class': "STRING",'name': "STRING",'id': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'class': ("form-control"),
    'name': ("description"),
    'id': ("description"),
    'placeholder': ("Description"),
    'value': ("description")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || depth0.textarea),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <div class=\"col-sm-offset-2 col-sm-10\">\n      <button id=\"submit\" class=\"btn btn-success\"  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        Submit\n      </button>\n      <br><br>\n      ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiments", options) : helperMissing.call(depth0, "link-to", "experiments", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </div>\n  </div>\n</form>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["experiment/filebrowser"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<iframe ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "ID"};
  options = {hash:{
    'src': ("urlBrowser")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" width=\"900\" height=\"600\" id=\"filebrowserframe\">\n  <p>Your browser doesn't support iframes</p>\n</iframe>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["experiment/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        Overview\n      </a>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        File Browser\n      </a>\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        Console\n      </a>\n    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n      <li class=\"dropdown\">\n        <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n          Fine-Grained Clustering <span class=\"caret\"></span>\n        </a>\n        <ul class=\"dropdown-menu\">\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "fineGrained-visualization-enable", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "fineGrained-quality-dunn", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </ul>\n      </li>\n    ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n            ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "fine-grained.2dvisualization", "id", options) : helperMissing.call(depth0, "link-to", "fine-grained.2dvisualization", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "fine-grained.3dvisualization", "id", options) : helperMissing.call(depth0, "link-to", "fine-grained.3dvisualization", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n              <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n                2D Visualization\n              </a>\n            ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n              <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n                3D Visualization\n              </a>\n            ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n            ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "fine-grained.quality", "id", options) : helperMissing.call(depth0, "link-to", "fine-grained.quality", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n              <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n                Quality\n              </a>\n            ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n      ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiment.signatures", "id", options) : helperMissing.call(depth0, "link-to", "experiment.signatures", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n        <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          Signatures\n        </a>\n      ");
  return buffer;
  }

  data.buffer.push("<div class=\"col-md-2\">\n  <ul class=\"nav nav-pills nav-stacked\">\n    ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiment.index", "id", options) : helperMissing.call(depth0, "link-to", "experiment.index", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiment.filebrowser", "id", options) : helperMissing.call(depth0, "link-to", "experiment.filebrowser", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiment.console", "id", options) : helperMissing.call(depth0, "link-to", "experiment.console", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "fineGrainedFeatures", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "signatures-enable", {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </ul>\n</div>\n<div class=\"col-md-10\">\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "experimentItem", options) : helperMissing.call(depth0, "partial", "experimentItem", options))));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["experiment/signatures"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<iframe ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "ID"};
  options = {hash:{
    'src': ("urlSignatures")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" width=\"900\" height=\"600\" id=\"filebrowserframe\">\n  <p>Your browser doesn't support iframes</p>\n</iframe>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["experiments"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        All (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "TotalNum", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\n      </a>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        In Progress (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "inprogressNum", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")</a></li>\n      </a>\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'href': ("view.href")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        Completed (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "completedNum", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\n      </a>\n    ");
  return buffer;
  }

  data.buffer.push("<div class=\"page-header\">\n  <ul class=\"nav nav-pills\">\n    ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiments.index", options) : helperMissing.call(depth0, "link-to", "experiments.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiments.active", options) : helperMissing.call(depth0, "link-to", "experiments.active", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  hashContexts = {'tagName': depth0,'activeClass': depth0,'href': depth0};
  hashTypes = {'tagName': "STRING",'activeClass': "STRING",'href': "BOOLEAN"};
  options = {hash:{
    'tagName': ("li"),
    'activeClass': ("active"),
    'href': (false)
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "experiments.completed", options) : helperMissing.call(depth0, "link-to", "experiments.completed", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </ul>\n</div>\n<div class=\"container\">\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["experiments/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashContexts, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "experimentItem", options) : helperMissing.call(depth0, "partial", "experimentItem", options))));
  data.buffer.push("\n");
  return buffer;
  }

  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, {hash:{
    'itemController': ("experiment")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

this["Ember"]["TEMPLATES"]["fine-grained/2dvisualization"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<form class=\"form-horizontal\" role=\"form\">\n  <div class=\"form-group\">\n    <label for=\"coarsecluster\" class=\"col-sm-3 control-label\">Coarse-grained cluster</label>\n    <div class=\"col-sm-9\">\n      ");
  hashContexts = {'content': depth0,'optionLabelPath': depth0,'valueBinding': depth0,'selection': depth0,'class': depth0,'id': depth0,'prompt': depth0};
  hashTypes = {'content': "ID",'optionLabelPath': "STRING",'valueBinding': "STRING",'selection': "ID",'class': "STRING",'id': "STRING",'prompt': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("clustersAvailable"),
    'optionLabelPath': ("content.clusterId"),
    'valueBinding': ("fineGrainedClusters"),
    'selection': ("selectedCluster"),
    'class': ("form-control"),
    'id': ("coarsecluster"),
    'prompt': ("Please select a cluster")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n  </div>\n</form>\n<div>\n  Information on X axis: <span id=\"xinfo\"></span><br>\n  Information on Y axis: <span id=\"yinfo\"></span>\n</div>\n\n<div id=\"tooltip2\">&nbsp;<br>&nbsp;</div>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["fine-grained/3dvisualization"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("You can't use it directly in this web interface, you have to install the software in Urho3D directory, see Urho3D/Readme.txt to install Urho3D with examples.<br>\nYou can\n\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.downloadLink || depth0.downloadLink),stack1 ? stack1.call(depth0, "downloadPath", options) : helperMissing.call(depth0, "downloadLink", "downloadPath", options))));
  data.buffer.push("\n  <button type=\"button\" class=\"btn btn-primary\">\n    <span class=\"glyphicon glyphicon-cloud-download\"></span>\n    3d visualization files\n  </button>\n</a>\n\n. Then, copy the .tsv files into the visualization folder.<br>\nFinally, launch Urho3D/Bin/23_Malwurl executable.\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["fine-grained/quality"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "c.dunn", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <li>\n        Coarse-grained cluster ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "c.clusterId", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n        <ul>\n          <li>Dunn Index: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "c.dunn", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n          <li>Noise: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "c.noiseUrls", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("/");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "c.urls", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" urls</li>\n        </ul>\n      </li>\n    ");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\n  <div class=\"col-md-4\">\n  <ul>\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "c", "in", "fineGrainedClusters", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </ul>\n  </div>\n  <div class=\"col-md-8\">\n    <iframe ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "ID"};
  options = {hash:{
    'src': ("urlBrowser")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" width=\"800\" height=\"600\" id=\"filebrowserframe\">\n      <p>Your browser doesn't support iframes</p>\n    </iframe>\n  </div>\n</div>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "experimentItem", options) : helperMissing.call(depth0, "partial", "experimentItem", options))));
  data.buffer.push("\n  ");
  return buffer;
  }

  data.buffer.push("<div class=\"container\" id=\"system_monitoring\">\n  <div class=\"page-header\">\n      <h2>System Monitoring</h2>\n  </div>\n  <!-- <div class=\"row controls\">\n      <div class=\"col-md-2\">\n          <a id=\"start\" class=\"btn btn-success disabled\" href=\"#\">\n            <i class=\"icon-play icon-white\"></i> Start\n          </a>\n          <a id=\"stop\" class=\"btn btn-danger disabled\" href=\"#\">\n            <i class=\"icon-stop icon-white\"></i> Stop\n          </a>\n      </div>\n      <div class=\"col-md-4\">\n        <div id='messages' class=\"span10\"></div>\n      </div>\n  </div> -->\n  <br>\n  <div class=\"row\">\n      <div id=\"sysinfo\" class=\"col-md-7\">\n        <span id=\"hostname\"></span> \n        <span id=\"type\"></span> \n        <span id=\"arch\"></span> \n        <span id=\"release\"></span>\n      </div>\n      <div id=\"uptime\" class=\"col-md-5\">\n        Uptime: <span class=\"value\">0</span>\n      </div>\n  </div>\n  <br>\n  <div class=\"row\">\n    <div id=\"cpus\" class=\"col-md-7\">CPU:\n      <span class=\"count\">0</span> x <span class=\"model\">0</span>\n    </div>\n    <div id=\"loadavg\" class=\"col-md-5\">\n      Load Avg: <span class=\"p1\">0</span> (1 min),\n      <span class=\"p5\">0</span> (5 min),\n      <span class=\"p15\">0</span> (15 min)\n    </div>\n  </div>\n  <br>\n  <div class=\"row col-md-12\">\n    <div class=\"col-md-1\"></div>\n    <div id=\"mem\" class=\"row col-md-3\">\n      System Memory: \n      <span class=\"perUsed\">0</span>% \n      (<span class=\"used\">0</span> MB / \n      <span class=\"total\">0</span> MB)\n      <div class=\"progress\">\n        <div class=\"progress-bar progress-bar-info\" style=\"width: 0%\"></div>\n      </div>\n    </div>\n    <div class=\"col-md-1\"></div>\n    <div id=\"swap\" class=\"row col-md-3\">\n      System Swap: \n      <span class=\"perUsed\">0</span>% \n      (<span class=\"used\">0</span> MB / \n      <span class=\"total\">0</span> MB)\n      <div class=\"progress\">\n        <div class=\"progress-bar progress-bar-info\" style=\"width: 0%\"></div>\n      </div>\n    </div>\n    <div class=\"col-md-1\"></div>\n    <div id=\"node-mem\" class=\"row col-md-3\">\n      Node Process Heap:\n      <span class=\"perUsed\">0</span>%\n      (<span class=\"used\">0</span> MB / \n      <span class=\"total\">0</span> MB)\n      <div class=\"progress\">\n        <div class=\"progress-bar progress-bar-info\" style=\"width: 0%\"></div>\n      </div>\n    </div>\n  </div>\n</div><!-- /.container#system_monitoring -->\n\n<div class=\"container\">\n  <div class=\"page-header\">\n      <h2>Ongoing Tasks (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "inprogressNum", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")</h2>\n  </div>\n  ");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, {hash:{
    'itemController': ("experiment")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["new_experiment"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"alert alert-danger\">You need to choose a dataset!</div>\n  ");
  }

  data.buffer.push("<div class=\"page-header\">\n    <h2>New experiment</h2>\n</div>\n\n<form class=\"form-horizontal\" role=\"form\" id=\"newExperimentForm\">\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "datasetEmpty", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  <div class=\"form-group\">\n    <label for=\"name\" class=\"col-sm-2 control-label\">Dataset</label>\n    <div class=\"col-sm-10\">\n      ");
  hashContexts = {'content': depth0,'optionLabelPath': depth0,'valueBinding': depth0,'class': depth0,'prompt': depth0};
  hashTypes = {'content': "ID",'optionLabelPath': "STRING",'valueBinding': "STRING",'class': "STRING",'prompt': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("datasets"),
    'optionLabelPath': ("content.name"),
    'valueBinding': ("dataset"),
    'class': ("form-control"),
    'prompt': ("Please select a dataset")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"description\" class=\"col-sm-2 control-label\">Description</label>\n    <div class=\"col-sm-10\">\n      ");
  hashContexts = {'class': depth0,'rows': depth0,'name': depth0,'id': depth0,'value': depth0};
  hashTypes = {'class': "STRING",'rows': "STRING",'name': "STRING",'id': "STRING",'value': "ID"};
  options = {hash:{
    'class': ("form-control"),
    'rows': ("3"),
    'name': ("description"),
    'id': ("description"),
    'value': ("description")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || depth0.textarea),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n  </div>\n  <fieldset>\n    <legend>Coarse-grained clustering</legend>\n    <div class=\"form-group\">\n      <label for=\"coarseGrained-clusteringAlgorithm\" class=\"col-sm-2 control-label\">Clustering Algorithm</label>\n      <div class=\"col-sm-10\">\n        <!-- <select id=\"coarseGrained-clusteringAlgorithm\" name=\"coarseGrained-clusteringAlgorithm\" class=\"form-control\"> -->\n          <!-- <option value=\"kmeans\">Kmeans</option> -->\n        <!-- </select> -->\n      ");
  hashContexts = {'content': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'content': "ID",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("coarseGrainedClusteringAlgorithm"),
    'valueBinding': ("coarseGrained-clusteringAlgorithm"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"coarseGrained-clusteringAlgorithm-kmeans-k\" class=\"col-sm-2 control-label\">k</label>\n      <div class=\"col-sm-10\">\n        ");
  hashContexts = {'name': depth0,'id': depth0,'class': depth0,'value': depth0,'required': depth0};
  hashTypes = {'name': "STRING",'id': "STRING",'class': "STRING",'value': "ID",'required': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NumberField", {hash:{
    'name': ("coarseGrained-clusteringAlgorithm-kmeans-k"),
    'id': ("coarseGrained-clusteringAlgorithm-kmeans-k"),
    'class': ("form-control"),
    'value': ("coarseGrained-clusteringAlgorithm-kmeans-k"),
    'required': ("")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <!-- <input name=\"coarseGrained-clusteringAlgorithm-kmeans-k\" id=\"coarseGrained-clusteringAlgorithm-kmeans-k\" class=\"form-control\" type=\"number\" value=\"3\" required> -->\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"coarseGrained-clusteringAlgorithm-kmeans-distance\" class=\"col-sm-2 control-label\">Distance Function</label>\n      <div class=\"col-sm-10\">\n        ");
  hashContexts = {'content': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'content': "ID",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("coarseGrainedClusteringAlgorithmKmeansDistance"),
    'valueBinding': ("coarseGrained-clusteringAlgorithm-kmeans-distance"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        <!-- <select id=\"coarseGrained-clusteringAlgorithm-kmeans-distance\" name=\"coarseGrained-clusteringAlgorithm-kmeans-distance\" class=\"form-control\">\n          <option value=\"lettersFrequency\">Letters Frequency</option>\n        </select> -->\n      </div>\n    </div>\n  </fieldset>\n\n  <fieldset>\n    <legend>Fine-grained clustering</legend>\n    <div class=\"form-group\">\n      <label for=\"fineGrained-clusteringAlgorithm\" class=\"col-sm-2 control-label\">Clustering Algorithm</label>\n      <div class=\"col-sm-10\">\n      ");
  hashContexts = {'content': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'content': "ID",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("fineGrainedClusteringAlgorithm"),
    'valueBinding': ("fineGrained-clusteringAlgorithm"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"fineGrained-clusteringAlgorithm-dbscan-eps\" class=\"col-sm-2 control-label\">eps</label>\n      <div class=\"col-sm-10\">\n        ");
  hashContexts = {'name': depth0,'id': depth0,'class': depth0,'value': depth0,'required': depth0};
  hashTypes = {'name': "STRING",'id': "STRING",'class': "STRING",'value': "ID",'required': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NumberField", {hash:{
    'name': ("fineGrained-clusteringAlgorithm-dbscan-eps"),
    'id': ("fineGrained-clusteringAlgorithm-dbscan-eps"),
    'class': ("form-control"),
    'value': ("fineGrained-clusteringAlgorithm-dbscan-eps"),
    'required': ("")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"fineGrained-clusteringAlgorithm-dbscan-k\" class=\"col-sm-2 control-label\">k</label>\n      <div class=\"col-sm-10\">\n        ");
  hashContexts = {'name': depth0,'id': depth0,'class': depth0,'value': depth0,'required': depth0};
  hashTypes = {'name': "STRING",'id': "STRING",'class': "STRING",'value': "ID",'required': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NumberField", {hash:{
    'name': ("fineGrained-clusteringAlgorithm-dbscan-k"),
    'id': ("fineGrained-clusteringAlgorithm-dbscan-k"),
    'class': ("form-control"),
    'value': ("fineGrained-clusteringAlgorithm-dbscan-k"),
    'required': ("")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"fineGrained-clusteringAlgorithm-dbscan-distance\" class=\"col-sm-2 control-label\">Distance Function</label>\n      <div class=\"col-sm-10\">\n        ");
  hashContexts = {'content': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'content': "ID",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("fineGrainedClusteringAlgorithmDbscanDistance"),
    'valueBinding': ("fineGrained-clusteringAlgorithm-dbscan-distance"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"fineGrained-quality-dunn\" class=\"col-sm-2 control-label\">Quality: Dunn index</label>\n      <div class=\"col-sm-10\">\n        <label class=\"checkbox-inline\">\n          ");
  hashContexts = {'type': depth0,'name': depth0,'id': depth0,'checked': depth0};
  hashTypes = {'type': "STRING",'name': "STRING",'id': "STRING",'checked': "ID"};
  options = {hash:{
    'type': ("checkbox"),
    'name': ("fineGrained-quality-dunn"),
    'id': ("fineGrained-quality-dunn"),
    'checked': ("fineGrained-quality-dunn")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </label>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"fineGrained-visualization-enable\" class=\"col-sm-2 control-label\">Visualization: Enable</label>\n      <div class=\"col-sm-10\">\n        <label class=\"checkbox-inline\">\n          ");
  hashContexts = {'type': depth0,'name': depth0,'id': depth0,'checked': depth0};
  hashTypes = {'type': "STRING",'name': "STRING",'id': "STRING",'checked': "ID"};
  options = {hash:{
    'type': ("checkbox"),
    'name': ("fineGrained-visualization-enable"),
    'id': ("fineGrained-visualization-enable"),
    'checked': ("fineGrained-visualization-enable")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </label>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"fineGrained-visualization-dimensionsReduction\" class=\"col-sm-2 control-label\">Visualization: Dimensions Reduction Algorithm</label>\n      <div class=\"col-sm-10\">\n        ");
  hashContexts = {'content': depth0,'valueBinding': depth0,'class': depth0};
  hashTypes = {'content': "ID",'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("fineGrainedVisualizationDimensionsReduction"),
    'valueBinding': ("fineGrained-visualization-dimensionsReduction"),
    'class': ("form-control")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      </div>\n    </div>\n  </fieldset>\n\n  <fieldset>\n    <legend>Signatures</legend>\n    <div class=\"form-group\">\n      <label for=\"signatures-enable\" class=\"col-sm-2 control-label\">Enable</label>\n      <div class=\"col-sm-10\">\n        <label class=\"checkbox-inline\">\n          ");
  hashContexts = {'type': depth0,'name': depth0,'id': depth0,'checked': depth0};
  hashTypes = {'type': "STRING",'name': "STRING",'id': "STRING",'checked': "ID"};
  options = {hash:{
    'type': ("checkbox"),
    'name': ("signatures-enable"),
    'id': ("signatures-enable"),
    'checked': ("signatures-enable")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </label>\n      </div>\n    </div>\n  </fieldset>\n  <div class=\"form-group\">\n    <div class=\"col-sm-offset-2 col-sm-10\">\n      <button id=\"submit\" class=\"btn btn-success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        Submit\n      </button>\n    </div>\n  </div>\n</form>\n");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["settings"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n    <li>\n      ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "setting.key", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(": ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "setting.value", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </li>\n  ");
  return buffer;
  }

  data.buffer.push("<ul>\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "setting", "in", "controller", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});