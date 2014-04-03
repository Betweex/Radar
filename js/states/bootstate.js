var OverGame = {};

OverGame.BootState = function(game) {
    
};

OverGame.BootState.prototype = {
  
    preload: function()
    {
		for(var i=0; i < OverGame.assets.BootState.spritesheets.length; i++)
		{
			var obj = OverGame.assets.BootState.spritesheets[i];
			this.game.load.spritesheet(obj.name, obj.path, obj.width, obj.height);
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
		
        this.game.state.start('Loader');
    }
};