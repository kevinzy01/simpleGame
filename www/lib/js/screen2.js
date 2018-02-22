var platforms;
var player;
var cursor;
var spacebar;
var stars;
var diamonds;
var starCount = 0;
var totalStars = 0;
var scoreText;
var decoration;
var starSound = new Howl({
  src: ["assets/starSound.mp3"]
});


var screen2 = {
  create: function () {

    this.physics.startSystem(Phaser.Physics.ARCADE);

    var bg = this.add.sprite(0, 0, "bg");
    bgWidth = bg.width;
    bgHeight = bg.height;

    // game.world.setBounds(0, 0, 1750, 1750)

    //platforms that is possible to jump on
    platforms = this.add.group();

    //enable physics for any object created in the group;
    platforms.enableBody = true;

    //  adding ground
    createMinimizedItem(0, bgHeight - 60, "leftTile");

    for (var i = 64; i < bgWidth - 100; i+=64) {
      createMinimizedItem(i, bgHeight - 60, "middleTile");
    };

    createMinimizedItem(bgWidth - 65, bgHeight - 60, "rightTile");

    // adding player
    player = game.add.sprite(32, game.world.height - 150, "dude");

    //enable physics on character
    game.physics.arcade.enable(player);

    //Give slight bounce to player
    player.body.bounce.y = .2;
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;

    //Walking animations
    player.animations.add("left", [0, 1, 2, 3], 10, true);
    player.animations.add("right", [5, 6, 7, 8], 10, true);

  //add controls
    cursors = this.input.keyboard.createCursorKeys();

    scoreText = game.add.text(16, 16, "Stars: 0 / " + totalStars , {fontSize: "32px", fill: "#000"})
    scoreText.fixedToCamera= true;

  },
  update: function () {

    var playerHitPlatform = game.physics.arcade.collide(player, platforms);

    //check if player overlaps stars
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //check if player overlaps diamond
    game.physics.arcade.overlap(player, diamonds, collectDia, null, this);

    //make player move
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      player.body.velocity.x = -150;

      player.animations.play("left")
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 150;

      player.animations.play("right");
    } else {
      player.animations.stop();

      player.frame = 4;
    };

    //allow player to jump if touching ground
    if (cursors.up.isDown && player.body.touching.down && playerHitPlatform) {
      player.body.velocity.y = -400;
    }
  }
}
