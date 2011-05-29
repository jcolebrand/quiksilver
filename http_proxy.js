/*
https://github.com/psanford/node-proxy/raw/master/http_proxy.js
 Copyright (c) 2010 Peter Sanford

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

var sys = require('sys'),
    http = require('http');

var server = http.createServer(function (client_request, client_resp) {
  //sys.puts(sys.inspect(client_request.headers));

  var host;
  var path;

  client_request.url.replace(/http:\/\/([^\/]*)(.*)/, function(m, h, p) {
    host = h;
    path = p;
  });

  path = path || '/';

  //sys.puts(client_request.method + " " + host + " " + path);
  var foreign_host = http.createClient(80, host);
  var request = foreign_host.request(client_request.method, path, client_request.headers);

  client_request.addListener("body", function (chunk) {
    request.sendBody(chunk);

  });

  client_request.addListener("complete", function () {
    request.finish(function (foreign_response) {
      //sys.puts("STATUS: " + foreign_response.statusCode);
      //sys.puts("HEADERS: " + JSON.stringify(foreign_response.headers));

      client_resp.sendHeader(foreign_response.statusCode, foreign_response.headers);
      foreign_response.addListener("body", function (chunk) {
        client_resp.sendBody(chunk, "binary");
      });
      foreign_response.addListener("complete", function (chunk) {
        client_resp.finish();
      });
    });
  });
});

server.listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');
