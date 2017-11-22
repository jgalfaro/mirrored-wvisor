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
