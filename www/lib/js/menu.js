var decoration;
var start;
var level;
var settings;

var startScreen = {
  preload: function () {
    this.load.image("bg", "assets/bg/platform/BG/BG.png")
    this.load.image("tree", "assets/bg/platform/Object/Tree_1.png")
    this.load.image("stone", "assets/bg/platform/Object/Stone.png")
    this.load.image("stone", "assets/bg/platform/Object/Stone.png")
    this.load.image("start", "assets/Button.png")
    this.load.image("level", "assets/level.png")
    this.load.image("settings", "assets/settings.png")
  },

  create: function () {
    // adding bg
    var bg = this.add.sprite(0, 0, "bg");
    bgWidth = bg.width;
    bgHeight = bg.height;

    // adding decoration & buttons
    decoration = this.add.group();
    platforms = this.add.group();

    // adding the buttons
    start = game.add.button(450, 375, 'start', loadLevel, this, 2, 1, 0);

    start.onInputUp.add(up, this);

    function up() {
        console.log('button up', arguments);
    };

    function loadLevel () {
      game.state.start("screen1")
    };

    settings = game.add.button(575, 375, "settings", openSettings, this, 2, 1, 0);

    settings.onInputUp.add(up, this);

    function openSettings() {
      console.log("pressed");
    };

    level = game.add.button(325, 380, "level", openSettings, this, 2, 1, 0);

    level.onInputUp.add(up, this);

    function openSettings() {
      console.log("pressed");
    };

    buttons.scale.setTo(.5, .5)
  },

  update: function () {

  },
};
