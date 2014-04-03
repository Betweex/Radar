OverGame.LoaderState = function(game)
{
    this._continue = Date.now();   
};

OverGame.LoaderState.prototype = {

    preload: function()
<<<<<<< HEAD
    {
        /*var spinner = this.add.sprite(800, 480, 'spinner');
		spinner.anchor.setTo(0.5, 0.5);
		spinner.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7,8,9,10, 
                                        11, 12, 13, 14, 15, 16, 17, 18, 19], 10, true);
		spinner.animations.play('spin');  */
        
=======
    {		
        var spinner = this.add.sprite(800, 480, 'spinner');
		spinner.anchor.setTo(0.5, 0.5);
		spinner.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7,8,9,10, 
                                        11, 12, 13, 14, 15, 16, 17], 20, true);
		spinner.animations.play('spin');
        
		
>>>>>>> Main Menu and Assets
        var assets = OverGame.assets;
        
        //load all game assets!

		//IMAGES
<<<<<<< HEAD
		for( var i = 0; i < assets.LoaderState.images.length; i++ ){
=======
		for( var i = 0; i < assets.LoaderState.images.length; i++ ) {
>>>>>>> Main Menu and Assets
			var obj = assets.LoaderState.images[i];
			this.game.load.image(obj.name, obj.path);
		}

		//SPRITESHEETS
<<<<<<< HEAD
		for( var i = 0; i < assets.LoaderState.spritesheets.length; i++ ){
=======
		for( var i = 0; i < assets.LoaderState.spritesheets.length; i++ ) {
>>>>>>> Main Menu and Assets
			var obj = assets.LoaderState.spritesheets[i];
			this.game.load.spritesheet(obj.name, obj.path, obj.width, obj.height);
		}

		//SOUNDS
<<<<<<< HEAD
		for( var i = 0; i < assets.LoaderState.audio.length; i++ ){
			var obj = assets.LoaderState.audio[i];
			this.game.load.audio(obj.name, obj.path);
		}
=======
		for( var i = 0; i < assets.LoaderState.audio.length; i++ ) {
			var obj = assets.LoaderState.audio[i];
			this.game.load.audio(obj.name, obj.path);
		}
				
>>>>>>> Main Menu and Assets
    },
    
    update: function()
    {
        if(Date.now() > this._continue)
        {
            this.game.state.start('MainWindow');   
        }
    }
};