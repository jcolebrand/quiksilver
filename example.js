var fs = require("fs");
var http = require("http");

var fd1 = fs.open('request','r');
var fd2 = fs.open('response','r');

var handler = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
//  var str1 = JSON.stringify(req,null,1);
//  var str2 = JSON.stringify(req,null,1);
//  fd1.write(str1,0,str1.length,null);
//  fd2.write(str2,0,str1.length,null);
  console.log(req);
  console.log('--------------------------------------------');
  console.log('--------------------------------------------');
  console.log('--------------------------------------------');
  console.log('--------------------------------------------');
  console.log('--------------------------------------------');
  console.log(res);
//  res.write(req);
  res.end('Hello World\n');
};

var server = http.createServer(handler);
server.listen(81);




