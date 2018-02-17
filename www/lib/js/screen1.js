var game = new Phaser.Game(1000, 750, Phaser.AUTO, '');
var platforms;
var player;
var cursor;
var spacebar;
var stars;
var crate;
var diamonds;
var diaCount = 0;
var totalDia = 0;
var starCount = 0;
var totalStars = 0;
var scoreText;
var starSound = new Howl({
  src: ["assets/starSound.mp3"]
})

//first game screen
var firstScreen = {
  preload: function () {
    this.load.spritesheet("fullTree", "assets/bg/platform/Object/Tree_2.png")
    this.load.image("bg", "assets/bg/platform/BG/BG.png")
    this.load.image("leftTile", "assets/bg/platform/Tiles/1.png")
    this.load.image("middleTile", "assets/bg/platform/Tiles/2.png")
    this.load.image("rightTile", "assets/bg/platform/Tiles/3.png")
    this.load.image("leftFloat", "assets/bg/platform/Tiles/13.png")
    this.load.image("middleFloat", "assets/bg/platform/Tiles/14.png")
    this.load.image("rightFloat", "assets/bg/platform/Tiles/15.png")
    this.load.image("stone", "assets/bg/platform/Object/Stone.png")
    this.load.spritesheet("crate", "assets/bg/platform/Object/Crate.png")
    this.load.image("tree", "assets/bg/platform/Object/Tree_1.png")
    this.load.image("star", "assets/star.png")
    this.load.image("diamond", "assets/diamond.png")
    this.load.spritesheet("dude", "assets/dude.png", 32, 48)
  },

  create: function () {
    //Starting game physics
    this.physics.startSystem(Phaser.Physics.ARCADE);

    //adding bg
    var bg = this.add.sprite(0, 0, "bg");
    bgWidth = bg.width;
    bgHeight = bg.height;

    //platforms that is possible to jump on
    platforms = this.add.group();
    crates = this.add.group();

    //enable physics for any object created in the group;
    platforms.enableBody = true;
    crates.enableBody = true;

    //creatingGround
    createMinimizedItem(0, bgHeight - 60, "leftTile");

    for (var i = 64; i < bgWidth - 100; i+=64) {
      createMinimizedItem(i, bgHeight - 60, "middleTile");
    };

    createMinimizedItem(bgWidth - 65, bgHeight - 60, "rightTile");

    //creating obstacles
    createMaximizedItem(258, 610, "stone");

    //Creating floating tiles
    createPlatform(322, 550, "leftFloat", "middleFloat", "rightFloat")
    createPlatform(547, 450, "leftFloat", "middleFloat", "rightFloat" )
    createPlatform(197, 350, "leftFloat", "middleFloat", "rightFloat")
    createPlatform(500, 200, "leftFloat", "middleFloat", "rightFloat" )
    createPlatform(800, 250, "leftFloat", "middleFloat", "rightFloat" )

    //add the character
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
    spacebar = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    //adding diamond
    diamonds = this.add.group();
    diamonds.enableBody = true;
    createDiamond(815, 210)

    //adding stars //substract 272 from central platform x
    stars = this.add.group();
    stars.enableBody = true;
    create3Stars(50, 510);
    create3Stars(275, 410);
    create3Stars(-75, 310);
    create3Stars(228, 160);

    //add a score
    scoreText = game.add.text(16, 16, "Stars: 0 / " + totalStars , {fontSize: "32px", fill: "#000"})
  },

  update: function () {
    //check collision
    var playerHitPlatform = game.physics.arcade.collide(player, platforms);

    //check if player overlaps stars
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //check if player overlaps diamond
    game.physics.arcade.overlap(player, diamonds, collectDia, null, this);

    //collide crates with world and player
    game.physics.arcade.collide(crates, platforms);

    //make crate move if touched by player
    var playerHitCrate = game.physics.arcade.collide(crates, player);

    // game.physics.arcade.acceleration(crates, 20)

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

    if (spacebar.isDown && player.body.touching.down && playerHitPlatform) {
      player.body.velocity.y = -400;
    }
  }
};
