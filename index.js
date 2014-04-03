/******************
** SERVER CREATION
*******************/

//Import Express module
var express = require('express');

//Import the 'path' module (packaged with Node.js)
var path = require('path');

//Create a new Express Application
var app = express();

//Import main game (individual client and its info) file
var gm =  require('./server');

//Create a simple Express application
app.configure(function() {
    //Turn down logging activity
    app.use(express.logger('dev'));
    
    //Serve static html, js, css, and image files from the Phaser root dir
    app.use(express.static(path.join(__dirname)));
});

//Create an http server with Node's HTTP module
//Pass it the Express application, and listen on port 8051
var server = require('http').createServer(app).listen(8051);

//Instantiate Socket.IO and have it listen on the Express/HTTP server
var io = require('socket.io').listen(server);

// Reduce the Logging output of Socket.IO
io.set('log level', 1);

//Listen for the Socket.IO Connections. Once connected, start the game Logic.
io.sockets.on('connection', function(socket) {
<<<<<<< HEAD
    console.log('\n\nClient Connection Established....... Starting Game Logic');
=======
    console.log('\nClient Connection Established....... Starting Game Logic');
>>>>>>> Main Menu and Assets
    gm.GameBegin(io, socket);
    
});
