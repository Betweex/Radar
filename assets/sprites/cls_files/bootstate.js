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
        this.game.state.start('Loader');
    }
};