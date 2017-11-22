var _ = require("lodash");

/**
* @module procinfo
* @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
*/
 
/**
* Format the content of an info file in the unix /proc fs
* @alias module:format
* @param {String} data - the content to format
* @param {Function} callback -
*/
exports.format = function(data, callback) {

  "use strict";

  if (!data) {
    callback(new Error("Empty data"));
  }
   
  callback(null, _.object( //map the splitted elts to an object
    //split by line and
    _.map(data.split("\n"), function(elt, key) {
      //resplit each line by ":"
      return _.map(elt.split(":"), function(elt){
        return elt.trim(); //and trim the content
      });
    })
  ));
};
