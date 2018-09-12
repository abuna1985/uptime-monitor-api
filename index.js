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

    // if there is a payload in the body, add data to the buffer
    req.on('data', data => buffer += decoder.write(data));

    // Once the request ends, add the remaining payload to the buffer and send the response
    req.on('end', () => {
        buffer += decoder.end();

        // Choose the handler the request should go to. If one is not found, use the notFound handler
        const choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        // Route the request to the handler specified in the router
        choosenHandler(data, (statusCode, payload) => {
            // Use the status code called back by the handler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode: 200;

            // Use the payload called back by the handler, or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the paylaod to a string
            const payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

             // Log the request path
            console.log('Request is returning this response: ', statusCode, payloadString);
        });   
    });
});
// Start the server, and have it listen on port 3000
server.listen(3000, () => console.log('The server is listening on port 3000 now'));

// Define the handlers
let handlers = {};

//Sample handler
handlers.sample = (data, callback) => {
    //callback a http status code, and return a  payload object
    callback(406,{'name' : 'Adam Abundis'});
};

// 404 handler
handlers.notFound = (data, callback) => {
    callback(404);
};


// Define therequest router
const router = {
    'sample': handlers.sample
};