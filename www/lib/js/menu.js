var decoration;
var start;
var level;
var settings;

var menuState = {
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

      level.scale.setTo(.5, .5)
      start.scale.setTo(.5, .5)
      settings.scale.setTo(.5, .5)
    },

    update: function () {

    },
  };
