var io;
var gSocket;
var activeGames = new Array();

exports.GameBegin = function(sio, socket) {
    io = sio;
    gSocket = socket;
    gSocket.emit('connected', { message: "Welcome, You are Connected" });
	
	//Pre game Events binds
	gSocket.on('play', playGame);
	gSocket.on('allReady', allReady);
	gSocket.on('addReady', addReady);
	
	//In-game events binds
	gSocket.on('doOpt', doOpt);
}


/************************************
**		PRE-GAME EVENTS
*************************************/

function playGame() {
	
	//If there is an available room
	var foundRoom = false;
	for(var i=0; i<activeGames.length; i++) {
		if(activeGames[i].Numppl < 2){
			var gmId = activeGames[i].gId;
			
			//Increment number of players in the room
			activeGames[i].Numppl += 1;
			
			//Join room
			this.join(gmId);
			
			//Notify player(s) in the room that you have joined
			io.sockets.in(gmId).emit('playGame');

			foundRoom = true;
			break;
		}
	}
	
<<<<<<< HEAD
	
=======
>>>>>>> Main Menu and Assets
	//If no available rooms
	if(foundRoom === false){
		
		//Initiate the creation of a new game (Room) instance
		var thisGameId = ( Math.random() * 100000 ) | 0;
		gameInfo = {gId: thisGameId, Numppl: 1}
		activeGames.push(gameInfo);
		
		//Notify Client browser of new game instance
		this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});
		
		//Join the room you created
		this.join(thisGameId.toString());
	}			
};

//Notify all browser clients in room to start their game
function allReady(data){
<<<<<<< HEAD
	
=======
>>>>>>> Main Menu and Assets
	io.sockets.in(data.gameId).emit('beginGame');
};

//Notify all to update number of ready players
function addReady(data){
	io.sockets.in(data.gameId).emit('upReady', data);
};

/************************************
**		IN-GAME EVENTS
*************************************/

function doOpt(data){
	
};