/*
 * Primary file for the API
 * 
 */

// Dependencies
const http = require('http');
const url = require('url');

// The server should respond to all request with a string
const server = http.createServer((req, res) => {
    // Get the URL and parse it
    const parsedURL = url.parse(req.url,true);

    // Get the path
    const path = parsedURL.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // get the query string as an object
    const queryStringObject = parsedURL.query;

    // Get the HTTP Method
    const method = req.method.toLowerCase();

    // Send the response
    res.end('Hello, World\n');

    // Log the request path
    console.log(`Request received on path: ${trimmedPath} with this method: ${method} and with these query string parameters: %j`, queryStringObject);
});
// Start the server, and have it listen on port 3000
server.listen(3000, () => console.log('The server is listening on port 3000 now'));