exports.route = function(router){
  router.resource('/', {
    get : get
  });
};

function get(req,res){
  res.write('<html><head><title>hello world</title></head><body><h1>this is the new root page</h1><a href="path/">Try this path instead</a></body></html>');
  res.end();
}