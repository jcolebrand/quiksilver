exports.route = function(router){
  router.resource('/path/:a123', {
    get : get
  });
};

function get(req,res){
  res.write('<html><head><title>hello world</title></head><body><h1>this is my new page</h1><a href="/">Go home</a></body></html>');
  res.end();
}