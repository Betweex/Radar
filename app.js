;
jQuery(function($){    
    'use strict';

    var IO = {
		
        init: function() {
            IO.socket = io.connect();
            IO.bindEvents();
        },
        
        bindEvents: function() {
			//Pre-Game Binds
            IO.socket.on('connected', IO.onConnected );
			IO.socket.on('playGame', IO.onPlayGame);
            IO.socket.on('newGameCreated', IO.onNewGameCreated );
			IO.socket.on('beginGame', IO.onBeginGame);
			IO.socket.on('upReady', IO.onUpReady);
			
			//In-game Binds
			IO.socket.on('gameOpt', IO.onGameOpt);		
			
        },
            
		/** Pre-Game Event Handlers **/
		
        onConnected : function() {
            // Cache a copy of the client's socket.IO session ID on the App
            App.mySocketId = IO.socket.socket.sessionid;
        },
            
		onPlayGame : function() {
			App.Player.onPlayClick();
		},
		
		onNewGameCreated: function(data) {
			App.Player.Update(data);
			App.Player.onPlayClick();
		},
		
		onBeginGame: function(){
			App.Player.startPhaser();
		},
		
		onUpReady: function(data){
			if(data.playerId == App.mySocketId)
				App.readyPlayers +=1;
		}
		
		
		
		/** In-game Event Handlers **/
    };
         
    var App = {
		
				gameId: 0,
		
                mySocketId: '',
		
				readyPlayers: 0,

                init: function() {
                    App.cacheElements();
                    App.showInitScreen();
                    App.bindEvents();

                },

                /*
                    Create references to on-screen elements used throughout the pre-game screens
                */

                cacheElements: function() {

                    App.$doc = $(document);

                    //Templates 
                    App.$gameArea = $('#preGameArea');
                    App.$templateIntroScreen = $('#intro-screen-template').html();
                    App.$templateWaitingScreen = $('#waiting-game-template').html();
<<<<<<< HEAD
=======
					App.$templateInGameScreen = $('#in-game-template').html();
>>>>>>> Main Menu and Assets
                },

                /*
                    Bind html buttons of the pre-game screen
                */

                bindEvents: function() {
                    // Player
                    App.$doc.on('click', '#btnPlayGame', App.Player.onPlayClick);
					App.$doc.on('click', '#btnReady', App.Player.onReadyClick);
                },  


                /*
                    Initial Game Logic
                */

                //SHOW INTIAL RADAR SCREEN (includes Start Button)    
                showInitScreen: function() {
                    App.$gameArea.html(App.$templateIntroScreen);
                    App.doTextFit('.title');
                },


                /* ***************
                *   HOST CODE                      
                **************** */

                /*Host: {

                    players : [],

                    numPlayersInRoom: 1,

                    onCreateClick: function() {
                        IO.socket.emit('hCreateNewGame');
                    },

                    gameInit: function(data) {
                        App.gameId = data.gameId;
                        App.mySocketId = data.mySocketId;
                        App.myRole = 'Host';
                        App.Host.numPlayersInRoom = 0;
                        //App.Host.startPhaser();    
                    },
                    
					displayNewGameScreen : function() {
						// Fill the game screen with the appropriate HTML
						App.$gameArea.html(App.$templateNewGame);

						// Show the gameId / room id on screen
						$('#spanNewGameCode').text(App.gameId);
					},
                                    
                    startPhaser: function() {
                        var width = 1600;
                        var height = 960;

                        var game = new Phaser.Game(width, height, Phaser.AUTO, '');

                        game.state.add('Boot', OverGame.BootState);
                        game.state.add('Loader', OverGame.LoaderState);
                        game.state.add('MainWindow', OverGame.MainWindowState);
                        game.state.add('Game', OverGame.GameState);

                        game.state.start('Boot');

                        window.game = game;
                    }

                },*/


                /* ***************
                *   PLAYERS CODE                     
                **************** */
                
                Player: {
                    
                    //hostSocketId: '',
<<<<<<< HEAD
                    myName: 'anoni',
=======
                    myName: 'anon',
>>>>>>> Main Menu and Assets
					
					Update: function(data) {
						App.mySocketId = data.mySocketId;
						App.gameId     = data.gameId;
					},
		
					onReadyClick: function() {
						
<<<<<<< HEAD
						App.Player.myName = $('#inputPlayerName').val();
=======
>>>>>>> Main Menu and Assets
						var data = {
								gameId: App.gameId,
								playerId: App.mySocketId
							}
<<<<<<< HEAD
=======
						
>>>>>>> Main Menu and Assets
						IO.socket.emit('addReady', data);
						App.Player.onPlayClick();
					},
                        
                    onPlayClick: function() {
<<<<<<< HEAD
                        if(App.readyPlayers >= 2 && App.Player.myName != 'anoni') {
=======
                        if(App.readyPlayers >= 2) {
>>>>>>> Main Menu and Assets
							
							var data = {
								gameId: App.gameId,
								playerId: App.mySocketId
							}
<<<<<<< HEAD
							IO.socket.emit('allReady', data);
						}
						else {
							if(App.readyPlayers < 2){
=======
							
							IO.socket.emit('allReady', data);
						}
						else {
							if(App.readyPlayers < 2) {
								
>>>>>>> Main Menu and Assets
								App.$gameArea.html(App.$templateWaitingScreen);
								App.doTextFit('.title'); 
							}
							else {
<<<<<<< HEAD
								//App.$gameArea.html(App.$templateWaitingScreen);
=======
								
>>>>>>> Main Menu and Assets
								 $('#playerWaitingMessage')
								.append('<p/>')
								.text('Joined Game ' + App.gameId + '. Please wait for game to begin.');	
							}
						}
                    },
					
					startPhaser: function() {
<<<<<<< HEAD
                        var width = 1600;
                        var height = 960;

                        var game = new Phaser.Game(width, height, Phaser.AUTO, '');

=======
						
                        var width = 1600;
						var height = 960;

                        var game = new Phaser.Game(width, height, Phaser.AUTO, '');
						
						//Initiate Boot and all other states
						game.state.add('Pre', OverGame.PreBootState);	
>>>>>>> Main Menu and Assets
                        game.state.add('Boot', OverGame.BootState);
                        game.state.add('Loader', OverGame.LoaderState);
                        game.state.add('MainWindow', OverGame.MainWindowState);
                        game.state.add('Game', OverGame.GameState);
<<<<<<< HEAD

=======
						game.state.add('Instructions', OverGame.InstructionState);
												
						//Clear all html and it's background content
						App.$gameArea.html(App.$templateInGameScreen);
						
>>>>>>> Main Menu and Assets
                        game.state.start('Boot');

                        window.game = game;
                    }
                    
                },
                    
                /* ***************
                *   UTILITY CODE                      
                **************** */

                doTextFit : function(el) {
                    textFit(
                        $(el)[0],
                        {
                            alignHoriz:true,
                            alignVert:false,
                            widthOnly:true,
                            reProcess:true,
                            maxFontSize:300
                        }
                    );
                }
<<<<<<< HEAD

=======
		
>>>>>>> Main Menu and Assets
	};    
                
    IO.init();
    App.init();
    
}($));
