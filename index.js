var http = require("http"),
    fs = require('fs'),
    os = require('os'),
    querystring = require('querystring');

var port = 6230;

var server = http.createServer(function (request, response) {
    if (request.method === "POST") {
        handlePOST(request, response);
    } else {

        fs.readFile('./testform.html', function (err, html) {
            if (err) {
                throw err;
            }

            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(html);
            response.end();
        });
    }

}).listen(port, listening);

function listening (err) {
    if (err) {
        console.error('error starting server', err)
        process.exit(1)
    }

    // Show what ports the server will be available (should be moved to the server listening part)
    console.log('System starting on:\n\nhttp://localhost:' + port);
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if (iface.family === 'IPv4') {
                console.error('http://' + iface.address + ':' + port)
            }
        })
    });
    console.log('\n');
}

var handlePOST = function(request, response) {
    var body = '';
    request.on('data', function (data) {
        body += data;
        // 1e2 === 1 * Math.pow(10, 2) === 1 * 100
        if (body.length > 1e2) {
            // Only allow very minimal posts as the only thing it should receive is a single hash
            request.connection.destroy();
        }
    });

    request.on('end', function () {
        var POST = querystring.parse(body);
        console.log(POST.key);
    });
}
