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
