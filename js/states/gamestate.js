OverGame.GameState = function(game) {
    
};

OverGame.GameState.prototype = {
    preload: function() {
  
    },
    
	create: function() {
		var mouse_o = new Phaser.Sound(this.game, 'mouse_o', .4);
		var mouse_d = new Phaser.Sound(this.game, 'mouse_d', .4);
        
	    var start_btn = new Phaser.Button(game, 800, 480, 'start', function(){
            IO.socket.emit('leave room');
            var message = 'I have left the room';
            console.log(message);
            game.state.start('MainWindow');
		}, this, 1, 0, 1);
        
        start_btn.anchor.setTo(0.5, 0.5);
		
		//Add over and down sounds to the buttons
		start_btn.setSounds(mouse_o, '', mouse_d);
		
		//Apply to game
		game.add.existing(start_btn);
        
        
        //emit to server 'play' event
        IO.socket.emit('play');
	},
	
    update: function() {
		
	}
};
