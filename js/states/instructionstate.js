OverGame.InstructionState = function(game) {
    
};


OverGame.InstructionState.prototype = {
       
	create: function() {
		
		this.add.sprite(0, 0, 'background');
		
		var back_btn = new Phaser.Button(this.game, 200, 200, 'back', function(){
			this.game.state.start('Game');
		}, this, 1, 0, 1);
		
		back_btn.anchor.setTo(0.5, 0.5);
		back_btn.setSounds(mouse_o, '', mouse_d);
		this.game.add.existing(back_btn);
		
	},
	
	update: function() {
		
	}
};

