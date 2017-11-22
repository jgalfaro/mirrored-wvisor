Ember.Handlebars.helper("downloadLink", function(relativePath) {
  var url = remoteHost + "/data" + relativePath;
  var html = "<a href='" + url + "'>";
  return new Handlebars.SafeString(html);
});
