var fs = require('fs');
var https = require('https');
var resource = require('./resource.js');
var main = require('./main.js');
var vhost = require('./vhost.js');

/* declare the https server options, like the certificate files */
var options = {
  key: fs.readFileSync('./keys/privatekey.pem'), 
  cert: fs.readFileSync('./keys/certificate.pem')
};

/* declare the launching of the server */
var server = https.createServer(options,vhost('jcolebrand.com',resource(main)));
server.listen(443);
