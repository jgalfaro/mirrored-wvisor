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
