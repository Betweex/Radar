OverGame.MainWindowState = function(game) {
    
};

OverGame.MainWindowState.prototype = {
    
    create: function() {
        this.add.sprite(0, 0, 'background');
		
		var mouse_o = new Phaser.Sound(game, 'mouse_o', .4);
		var mouse_d = new Phaser.Sound(game, 'mouse_d', .4);
	
		//Apply Events for the buttons
		var start_btn = new Phaser.Button(game, 800, 480, 'start', function(){
			game.state.start('Game');
		}, this, 1, 0, 1);
			
		var inst_btn = new Phaser.Button(game, 800, 625.5, 'instruct', function(){
			game.state.start('Instructions');			
		}, this, 1, 0, 1);
		
		var quit_btn = new Phaser.Button(game, 800, 771, 'quit', function(){
			window.close();
		}, this, 1, 0, 1);
		
		//Set button achors
		start_btn.anchor.setTo(0.5, 0.5);
		inst_btn.anchor.setTo(0.5, 0.5);
		quit_btn.anchor.setTo(0.5, 0.5);
		
		//Add over and down sounds to the buttons
		start_btn.setSounds(mouse_o, '', mouse_d);
		inst_btn.setSounds(mouse_o, '', mouse_d);
		quit_btn.setSounds(mouse_o, '', mouse_d);
		
		//Apply to game
		game.add.existing(start_btn);
		game.add.existing(inst_btn);
		game.add.existing(quit_btn);
		
    },
	
    update: function() {
    }   
};