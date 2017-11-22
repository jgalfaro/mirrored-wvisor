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
