var OverGame = {};
var IO = {};

OverGame.BootState = function(game) {
    
};

OverGame.BootState.prototype = {
  
    preload: function()
    {
		for(var i=0; i < OverGame.assets.BootState.spritesheets.length; i++)
		{
			var obj = OverGame.assets.BootState.spritesheets[i];
			game.load.spritesheet(obj.name, obj.path, obj.width, obj.height);
		}
    },
    
    create: function()
    {
		//Scale the game to fit screen before loading
		game.stage.scale.pageAlignHorizontally = true;
		game.stage.scale.minWidth = 1600;
		game.stage.scale.minHeight = 960;
		game.stage.scale.setScreenSize(true);
		game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		
        IO = {
            
            init: function() {
                IO.socket = io.connect();
                IO.bindEvents();
            },

            bindEvents: function() {
                //Game Binds
                IO.socket.on('welcome', IO.welcome);
                IO.socket.on('message', IO.message);
                IO.socket.on('create room', IO.createRoom);
                IO.socket.on('join room', IO.joinRoom);
                IO.socket.on('disconnect', IO.disconnect);
            },

            /** Pre-Game Event Handlers **/

            welcome : function(data) {
                console.log(data.message);
            },

            message : function(data) {
                console.log(data.message);  
            },
            
            createRoom : function(data) {
                var message = 'I have created ' + data.room;
                console.log(message);   
            },
            
            joinRoom : function(data) {
                var message = 'I have joined ' + data.room;
                console.log(message);
            },
            
            disconnect : function(data) {
                console.log(data.message);
                IO.socket.emit('leave room');
                var message = 'I have left ' + data.room;
                console.log(message);
                game.state.start('MainWindow');
            }

        };
            
        IO.init();
        
        game.state.start('Loader');
    }
};