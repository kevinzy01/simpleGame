var game = new Phaser.Game(1000, 750, Phaser.AUTO, '');

game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("gameOver", gameOver);
game.state.add("screen1", screen1);
game.state.add("screen2", screen2)
// game.state.add("screen3", screen3)

game.state.start("load")
