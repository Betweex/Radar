OverGame.MainWindowState = function(game) {
    
};

OverGame.MainWindowState.prototype = {
    
    create: function() {
        
        this.add.sprite(0, 0, 'background');
		var start_btn = new Phaser.Button(this.game, 1600/2, 600, 'start', function(){
			this.game.state.start('Game');
		}, this, 1, 0, 0);
		start_btn.anchor.setTo(0.5, 0.5);
		this.game.add.existing(start_btn);  
        
        this.game.menumusic = this.game.add.audio('1000ships', .4, true);
        this.game.menumusic.play('',0,0.4,true);
    },
    
    update: function() {
    
    }   
};