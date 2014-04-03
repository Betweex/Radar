OverGame.MainWindowState = function(game) {
    
};

OverGame.MainWindowState.prototype = {
    
    create: function() {
        
<<<<<<< HEAD
		this.game.menumusic = this.game.add.audio('1000ships', .4, true);
        this.game.menumusic.play('',0,0.4,true);
		
        this.add.sprite(0, 0, 'background');
		var start_btn = new Phaser.Button(this.game, 1600/2, 600, 'start', function(){
			this.game.state.start('Game');
		}, this, 1, 0, 0);
		start_btn.anchor.setTo(0.5, 0.5);
		this.game.add.existing(start_btn);  
        
        
    },
=======
		this.game.menumusic = this.game.add.audio('1000ships', .3, true);
        this.game.menumusic.play('', 0, 0.3, true);

        this.add.sprite(0, 0, 'background');
		
		var mouse_o = new Phaser.Sound(this.game, 'mouse_o', .4);
		var mouse_d = new Phaser.Sound(this.game, 'mouse_d', .4);
	
		//Apply Events for the buttons
		var start_btn = new Phaser.Button(this.game, 800, 480, 'start', function(){
			this.game.state.start('Game');
		}, this, 1, 0, 1);
			
		var inst_btn = new Phaser.Button(this.game, 800, 625.5, 'instruct', function(){
			this.game.state.start('Instructions');			
		}, this, 1, 0, 1);
		
		
		var quit_btn = new Phaser.Button(this.game, 800, 771, 'quit', function(){
			this.game.state.start('Pre');
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
		this.game.add.existing(start_btn);
		this.game.add.existing(inst_btn);
		this.game.add.existing(quit_btn);
		
    },
	
>>>>>>> Main Menu and Assets
    update: function() {
    
    }   
};