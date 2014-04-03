;
jQuery(function($){    
    'use strict';

    var IO = {
		
        init: function() {
            IO.socket = io.connect();
            IO.bindEvents();
        },
        
        bindEvents: function() {
            IO.socket.on('connected', IO.onConnected );
			IO.socket.on('playGame', IO.onPlayGame);
            IO.socket.on('newGameCreated', IO.onNewGameCreated );
			IO.socket.on('beginGame', IO.onBeginGame);
			IO.socket.on('upReady', IO.onUpReady);
        },
            
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
		
		onUpReady: function(){
			App.readyPlayers +=1;
		}
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
                    Create references to on-screen elements used throughout the game.
                */

                cacheElements: function() {

                    App.$doc = $(document);

                    //Templates 
                    App.$gameArea = $('#preGameArea');
                    App.$templateIntroScreen = $('#intro-screen-template').html();
                    App.$templateWaitingScreen = $('#waiting-game-template').html();
                },

                /*
                    Create Even Handlers buttons on the pre-game screen
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
                    myName: 'anoni',
					
					Update: function(data) {
						App.mySocketId = data.mySocketId;
						App.gameId     = data.gameId;
					},
		
					onReadyClick: function() {
						App.Player.myName = $('#inputPlayerName').val();
						var data = {
								gameId: App.gameId,
								playerId: App.mySocketId
							}
						IO.socket.emit('addReady', data);
						App.Player.onPlayClick();
					},
                        
                    onPlayClick: function() {
                        if(App.readyPlayers >= 2 || App.Player.myName != 'anoni') {
							
							var data = {
								gameId: App.gameId,
								playerId: App.mySocketId
							}
							IO.socket.emit('allReady', data);
						}
						else {
							if(App.readyPlayers < 2){
								App.$gameArea.html(App.$templateWaitingScreen);
								App.doTextFit('.title'); 
							}
							else {
								App.$gameArea.html(App.$templateWaitingScreen);
								 $('#playerWaitingMessage')
								.append('<p/>')
								.text('Joined Game ' + App.gameId + '. Please wait for game to begin.');	
							}
						}
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

	};    
                
    IO.init();
    App.init();
    
}($));
