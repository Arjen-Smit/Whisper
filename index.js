var http = require("http");

var server = http.createServer(function (request, response) {
  console.log(request.headers.key);

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('post received');

}).listen(6230);
