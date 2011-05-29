/* this is the main function of the app. */

var fs = require('fs');
module.exports = function(router){

  /* Go get all the routes in the routes directory so we don't have to guess on our own. */
  // read all files
  fs.readdir("routes", function(err,files) {
    files.forEach(function(val) {
      // require all non-index.js files.
      if (val !== "index.js") {
        require('./routes/' + val).route(router);
      }
    });
  });
}