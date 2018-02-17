var game = new Phaser.Game(0, 0, Phaser.AUTO, 'gameDiv');

// game.state.add("boot", bootState);
game.state.add("screen1", screen1);
game.state.add("menu", menuState);
// game.state.add("play", playState);
// game.state.add("win", winState);

game.state.start("menu")
