var http = require ('http');
var url = require ('url');

// creating a http server program that will run on the server computer

http.createServer (
    function (request, result) {
        var urlObject = url.parse(request.url, true);
        var protocol = urlObject.protocol;
        var host = urlObject.host;
        var hostName = urlObject.hostname;
        var path = urlObject.path;
        var pathName = urlObject.pathname;
        var query = urlObject.query;
        var port = urlObject.port;

        console.log(`url     : ${request.url}`);
        console.log(`protocol: ${protocol}`);
        console.log(`host    : ${host}`);
        console.log(`hostName: ${hostName}`);
        console.log(`path    : ${path}`);
        console.log(`pathName: ${pathName}`);
        console.log(`port    : ${port}`);

        for (const property in query) {
            console.log(`${property}: ${query[property]}`);
        }

        result.write('<html>');
        result.write('<head></head>');
        result.write('<body>hello from generated html<br/>');
        result.write(new Date().toISOString());
        result.write('<br/>')

        if (pathName == "/irini") {
            result.write('hi irini');
        }
        else if (pathName == "/george") {
            result.write('hi george');
        }
        else {
            result.write('I don\'t know you');
        }

        result.write('</body></html>');
        result.end();

// listen on port 8080
}).listen(8080);
    