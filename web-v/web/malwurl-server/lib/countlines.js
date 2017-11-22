var fs = require("fs");

module.exports = function(filePath, fn) {
  var count = 0;
  var i;
  
  fs.createReadStream(filePath)
    .on("data", function(chunk) {
      for (i=0; i < chunk.length; ++i) {
        if (chunk[i] === 10) {
          count++;
        }
      }
    })
    .on("end", function() {
      fn(count);
    });
};
