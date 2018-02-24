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
var crate;
var crates;
var water;
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
    crates = this.add.group();
    water = this.add.group();

    //enable physics for any object created in the group;
    platforms.enableBody = true;

    //  adding ground
    createMinimizedItem(0, bgHeight - 60, "leftTile");

    for (var i = 64; i < bgWidth - 500; i+=64) {
      createMinimizedItem(i, bgHeight - 60, "middleTile");
    };

    for (var i = 830; i < bgWidth - 64; i+=64) {
      createMinimizedItem(i, bgHeight - 60, "middleTile");
    };

    createMinimizedItem(bgWidth - 65, bgHeight - 60, "rightTile");

    // adding water
    for (var i = 511; i < bgWidth - 200 ; i+=64) {
      createMinimizedWater(i, bgHeight - 30, "water");
    };

    // adding crates
    createCrate(300, 300, "crate");

    // adding platforms
    createPlatform(300, 400, "leftFloat", "middleFloat", "rightFloat")

    // adding player
    player = game.add.sprite(700, game.world.height - 150, "dude");

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
    var crateHitPlatform = game.physics.arcade.collide(crates, platforms);
    var playerHitCrate = game.physics.arcade.collide(player, crates);

    //check if player overlaps stars
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //check if player overlaps diamond
    game.physics.arcade.overlap(player, diamonds, collectDia, null, this);

    // check if player hits water
    game.physics.arcade.overlap(player, water, killPlayer, null, this)

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
    };
  }
}
