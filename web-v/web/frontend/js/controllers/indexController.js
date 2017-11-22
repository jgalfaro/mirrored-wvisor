App.IndexController = Ember.ArrayController.extend({
  inprogressNum: function () {
    return this.filterBy("finished", false)
      .filterBy("id") // remove empty experiments
      .get("length");
  }.property("@each.finished")
});
