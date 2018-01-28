const mongoose = require('mongoose');
var db = mongoose.createConnection("localhost", "3000");

var GameState = {
  preload: function () {
    this.load.image("catIdle", "assets/images/cat/Idle(1).png")
  },
  create: function () {
    this.add.sprite(0, 0, "catIdle")
  },
  update: function () {

  }
};

var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add("GameState", GameState);
game.state.start("GameState")

app.listen("3000", function () {
  console.log("Server Started");
})
