/******************
** SERVER CREATION
*******************/

var roomNum = 0;
var rooms = new Array();

//Import Express module
var express = require('express');

//Import the 'path' module (packaged with Node.js)
var path = require('path');

//Create a new Express Application
var app = express();

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

io.sockets.on('connection', function(client) {
    client.emit('welcome', { message: "Welcome, You are Connected" });
    
	//Pre game Events binds
	client.on('play', function() {
    
        // Look for available room
        for(var i = 0; i < rooms.length; i++) {
            if(rooms[i].numppl < 2) {
                //Increment number of players in the room
                rooms[i].numppl += 1;

                //Join room
                client.join(rooms[i].room);
                client.emit('join room', { room: rooms[i].room } );
                var message =  client.id + ' has joined ' + rooms[i].room;
                client.broadcast.to(rooms[i].room).emit('message', { message: message } );
                return;
            }
        }

        //Initiate the creation of a new game (Room) instance if room not found
        roomNum += 1;
        var roomName = 'Room' + roomNum;
        gameInfo = { room: roomName, numppl: 1 }
        rooms.push(gameInfo);

        //Notify Client browser of new game instance
        client.emit('create room', { room: roomName } );

        //Join the room you created
        client.join(roomName);
    });
    
    client.on('leave room', function() {
        var soc_rooms = io.sockets.manager.roomClients[this.id];
    
        var arr = [ ];
        for(var key in soc_rooms) {
            if(soc_rooms.hasOwnProperty(key)) {
                arr.push(key);   
            }
        }
        
        var room = arr[arr.length-1];
        room = room.substring(1,room.length);
        
        for(var i = 0; i < rooms.length; i++) {
            if(rooms[i].room == room) {
                rooms[i].numppl -= 1;
            }
        }
        
        client.leave(room);
        var message = client.id + ' has left ' + room;
        
        io.sockets.in(room).emit('message', { message: message } );        
    });
    
    client.on('disconnect', function() {
        var soc_rooms = io.sockets.manager.roomClients[this.id];
    
        var arr = [ ];
        for(var key in soc_rooms) {
            if(soc_rooms.hasOwnProperty(key)) {
                arr.push(key);   
            }
        }
        
        var room = arr[arr.length-1];
        room = room.substring(1,room.length);
        
        for(var i = 0; i < rooms.length; i++) {
            if(rooms[i].room == room) {
                rooms[i].numppl -= 1;
            }
        }

        var message = client.id + ' has left ' + room;
        io.sockets.in(room).emit('disconnect', { message: message, room: room } );

        console.log(client.id + ' disconnected');       
    });
});