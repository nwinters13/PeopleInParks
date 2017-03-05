const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// var mongoose = require('mongoose');
// mongoose.connect("localhost:27017/mongotest1", function(err, db) {
//   if (err) {
//     console.log("unable to connect to the server");
//   }
//   else {
//     console.log("successfully connected");
//   }
// });

//var routes = require("routes");
//var users = require("routes/users");
