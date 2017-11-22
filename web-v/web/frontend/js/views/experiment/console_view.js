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
