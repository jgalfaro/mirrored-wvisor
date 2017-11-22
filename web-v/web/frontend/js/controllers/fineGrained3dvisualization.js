App.FineGrained3dvisualizationController = Ember.ObjectController.extend({
  downloadPath: function() {
    return "/../experiments/" + this.get("id") + "/3dvisualization/download";
  }.property()
});
