var hp = 3;
var hpText;
var platforms;
var crates;
var water;
var player;
var stars;
var diamonds;
var decoration;
var starSound = new Howl({
  src: ["assets/starSound.mp3"]
});
var waterSound = new Howl({
  src: ["assets/water.wav"]
});
var starCount = 0;
var totalStars = 0;
var scoreText;


var loadState = {
  preload: function () {
    var loadingLabel = game.add.text(80, 50, "loading...", {font: "30px Courier", fill: "#ffffff"});

    this.load.image("bg", "assets/bg/platform/BG/BG.png")
    this.load.image("tree", "assets/bg/platform/Object/Tree_1.png")
    this.load.image("stone", "assets/bg/platform/Object/Stone.png")
    this.load.image("bush1", "assets/bg/platform/Object/Bush(1).png")
    this.load.image("bush2", "assets/bg/platform/Object/Bush(2).png")
    this.load.image("bush3", "assets/bg/platform/Object/Bush(3).png")
    this.load.image("bush4", "assets/bg/platform/Object/Bush(4).png")
    this.load.image("sign", "assets/bg/platform/Object/Sign_1.png")
    this.load.image("iceBox", "assets/bg/winterPlat/Object/IceBox.png")
    this.load.image("crystal", "assets/bg/winterPlat/Object/Crystal.png")
    this.load.image("start", "assets/Button.png")
    this.load.image("level", "assets/level.png")
    this.load.image("reset", "assets/reset.png")
    this.load.image("settings", "assets/settings.png")
    this.load.image("aid", "assets/firstaid.png")
    this.load.spritesheet("fullTree", "assets/bg/platform/Object/Tree_2.png")
    this.load.image("crate", "assets/bg/platform/Object/Crate.png")
    this.load.image("leftTile", "assets/bg/platform/Tiles/1.png")
    this.load.image("water", "assets/bg/platform/Tiles/17.png")
    this.load.image("middleTile", "assets/bg/platform/Tiles/2.png")
    this.load.image("rightTile", "assets/bg/platform/Tiles/3.png")
    this.load.image("leftFloat", "assets/bg/platform/Tiles/13.png")
    this.load.image("middleFloat", "assets/bg/platform/Tiles/14.png")
    this.load.image("rightFloat", "assets/bg/platform/Tiles/15.png")
    this.load.spritesheet("crate", "assets/bg/platform/Object/Crate.png")
    this.load.image("star", "assets/star.png")
    this.load.image("diamond", "assets/diamond.png")
    this.load.spritesheet("dude", "assets/dude.png", 32, 48)

  },
  create: function () {
    game.state.start("screen2");
  }
}
