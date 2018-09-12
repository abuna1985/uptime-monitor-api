/*
 * Primary file for the API
 * 
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all request with a string
const server = http.createServer((req, res) => {
    // Get the URL and parse it
    const parsedURL = url.parse(req.url,true);

    // Get the path
    const path = parsedURL.pathname;

    // Remove initial / and ending /
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // get the query string as an object
    const queryStringObject = parsedURL.query;

    // Get the HTTP Method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    // if there is a body, add data to the buffer
    req.on('data', data => buffer += decoder.write(data));
    
    // Once the request ends, add the remaining data to the buffer and send the response
    req.on('end', () => {
        buffer += decoder.end();

        // Send the response
        res.end('Hello, World\n');

        // Log the request path
        console.log('Request received with this payload: ', buffer);
    });
});
// Start the server, and have it listen on port 3000
server.listen(3000, () => console.log('The server is listening on port 3000 now'));