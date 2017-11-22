Ember.Handlebars.helper("nl2br", function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return new Handlebars.SafeString(escaped.replace(/\n/g,"<br>"));
});
