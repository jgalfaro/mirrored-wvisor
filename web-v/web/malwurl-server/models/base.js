module.exports = function(data) {
  this.data = data;
};
module.exports.prototype = {
  extend: function(properties) {
    var Child = module.exports;
    Child.prototype = module.exports.prototype;
    for(var key in properties) {
      Child.prototype[key] = properties[key];
    }
    return Child;
  },
  setData: function(data) {
    this.data = data;
  }
};
