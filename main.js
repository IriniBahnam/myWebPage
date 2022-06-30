var http = require ('http');
var url = require('url');

// tells javascript to go read the fs code because i'm about
// to use stuff from there...
var fs = require('fs');

// creating a http server program that will run on the server computer
function setResult(fileName, result){

    // start using fs code...
    fs.readFile(fileName, 'utf8',
        // err: will hold the error in case a problem occurs while reading the file.
        // data: will hold the contents of the file if the read is successful.
        (err, data) => {
            if (err) {
                // let the developer know about the problem...
                console.error(err);

                // let the end user know about the problem...
                result.write("<html><body>Ops! Something bad happened!<br/>Contact customer support to fix it!<br/>" + err.message + "</body></html>");
                result.end();

                return;
            }
           
            console.log(data);

       
            result.write(data);
            result.end();
          
        }
    );
}

http.createServer(
    function (request, result) {


        // = means ASSIGN the value of what's on the right to 
        // the variable on the left...
        // = is called the assignment operator
        var urlObject = url.parse(request.url, true);

        var protocol = urlObject.protocol;
        var host = urlObject.host;
        var hostName = urlObject.hostname;
        var path = urlObject.path;
        var pathName = urlObject.pathname;
        var query = urlObject.query;
        var port = urlObject.port;
        var title = urlObject.title;

        console.log(`----- new request just came in.. printing... -----`);
        console.log(`url     : ${request.url}`);
        console.log(`protocol: ${protocol}`);
        console.log(`host    : ${host}`);
        console.log(`hostName: ${hostName}`);
        console.log(`path    : ${path}`);
        console.log(`pathName: ${pathName}`);
        console.log(`port    : ${port}`);
        console.log(`title   : ${title}`);
    

        for (const property in query) {
            console.log(`${property}: ${query[property]}`);
        }
        console.log(`----- end of request  -----`);

        // == means CHECK if the value of what's on the left is the same
        // as the value of what's on the right...
        // == is called the equality operatory
        if (pathName == "/main") {

            // start using fs code...
            fs.readFile('main.html', 'utf8',
                // err: will hold the error in case a problem occurs while reading the file.
                // data: will hold the contents of the file if the read is successful.
                (err, data) => {
                    if (err) {
                        // let the developer know about the problem...
                        console.error(err);

                        // let the end user know about the problem...
                        result.write("<html><body>Ops! Something bad happened!<br/>Contact customer support to fix it!<br/>" + err.message + "</body></html>");
                        result.end();

                        return;
                    }
                    console.log('---- inside onDataReady...');

                    data = data.replace(/TIME_VARIABLE/i, new Date().toISOString());

                    console.log(data);

                    console.log('---- writing file contents to result...')
                    result.write(data);
                    result.end();
                    console.log('---- leaving onDataReady...')
                }

            );
        }
        else if (pathName == "/about") {
            setResult('about.html', result);
        }
        else if (pathName == "/contact") {
            setResult('contact.html', result);
        }
        else if (pathName == "/projects") {
            setResult('projects.html', result);
        }
        else if (pathName == "/") {
            setResult('main.html', result);
        }
        else {
            setResult('error.html', result);
        }


// listen on port 8080
}).listen(8080);

    