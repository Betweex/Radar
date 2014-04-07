var App = {

    startPhaser: function() {
        
        var width = 1600;
        var height = 960;

        var game = new Phaser.Game(width, height, Phaser.AUTO, '');

        //Initiate all states
        game.state.add('Boot', OverGame.BootState);
        game.state.add('Loader', OverGame.LoaderState);
        game.state.add('MainWindow', OverGame.MainWindowState);
        game.state.add('Game', OverGame.GameState);
        game.state.add('Instructions', OverGame.InstructionState);

        game.state.start('Boot');

        window.game = game;
    }
};

App.startPhaser();
