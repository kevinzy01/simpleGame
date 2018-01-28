var game = new Phaser.Game(1000, 750, Phaser.AUTO, '');
var platforms;
var player;
var cursor;
var stars;
var score = 0;
var scoreText;
var starSound = new Howl({
  src: ["assets/starSound.mp3"]
})

//functions
function createMinimizedItem(x, y, image) {
  var item = platforms.create(x, y, image);
  item.scale.setTo(.5, .5);
  item.body.immovable = true;
}

function createMaximizedItem(x, y, image) {
  var item = platforms.create(x, y, image);
  item.scale.setTo(1.5, 1.5);
  item.body.immovable = true;
}

function createItem(x, y, image) {
  var item = platforms.create(x, y, image);
  item.body.immovable = true;
}

function createCrate(x, y, image) {
  var item = crate.create(x, y, image);
  item.body.immovable = false;
  //add physics to item
  item.body.gravity.y = 500;
  item.body.collideWorldBounds = true;
  game.physics.arcade.enable(item);
}

function createPlatform(x, y, leftTile, middleTile, rightTile) {
  var plat = platforms.create(x, y, middleTile);
  plat.body.immovable = true;
  plat.scale.setTo(.5, .5);
  var plat = platforms.create(x - 64, y, leftTile );
  plat.body.immovable = true;
  plat.scale.setTo(.5, .5);
  var plat = platforms.create(x + 64, y, rightTile);
  plat.body.immovable = true;
  plat.scale.setTo(.5, .5);
}

function collectStar (player, star) {
  //remove star
  star.kill()
  //add 10 points to score
  score += 10;
  scoreText.text = "Score: " + score
  //add star sound
  starSound.play()
};

//first game state
var GameState = {
  preload: function () {
    this.load.image("catIdle", "assets/characters/cat/Idle(1).png")
    this.load.image("bg", "assets/bg/png/BG/BG.png")
    this.load.image("leftTile", "assets/bg/png/Tiles/1.png")
    this.load.image("middleTile", "assets/bg/png/Tiles/2.png")
    this.load.image("rightTile", "assets/bg/png/Tiles/3.png")
    this.load.image("leftFloat", "assets/bg/png/Tiles/13.png")
    this.load.image("middleFloat", "assets/bg/png/Tiles/14.png")
    this.load.image("rightFloat", "assets/bg/png/Tiles/15.png")
    this.load.image("star", "assets/star.png")
    this.load.image("stone", "assets/bg/png/Object/Stone.png")
    this.load.image("crate", "assets/bg/png/Object/Crate.png")
    this.load.image("tree", "assets/bg/png/Object/Tree_1.png")
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
    crate = this.add.group();

    //enable physics for any object created in the group;
    platforms.enableBody = true;
    crate.enableBody = true;

    //creatingGround
    createMinimizedItem(0, bgHeight - 60, "leftTile");

    for (var i = 64; i < bgWidth - 100; i+=64) {
      createMinimizedItem(i, bgHeight - 60, "middleTile");
    };

    createMinimizedItem(bgWidth - 65, bgHeight - 60, "rightTile");

    //creating obstacles
    createMaximizedItem(258, 610, "stone");
    createCrate(386, 450, "crate");

    //Creating floating tiles
    createPlatform(197, 350, "leftFloat", "middleFloat", "rightFloat")
    createPlatform(322, 550, "leftFloat", "middleFloat", "rightFloat")
    createPlatform(547, 450, "leftFloat", "middleFloat", "rightFloat" )

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

    //adding stars
    stars = this.add.group();
    stars.enableBody = true;

    //creating stars
    for (var i = 250; i < 330; i+= 40) {
      var star = stars.create(i + 55, 510 , "star");
      star.body.gravity.y = 0;
    }

    for (var i = 250; i < 370; i+= 40) {
      //create a star inside star group
      var star = stars.create(i + 275, 410, "star")
      //make stars static
      star.body.gravity.y = 0;
    }
    //add a score
    scoreText = game.add.text(16, 16, "Score: 0" , {fontSize: "32px", fill: "#000"})
  },

  update: function () {
    //check collision
    var playerHitPlatform = game.physics.arcade.collide(player, platforms);

    //check if player overlaps stars
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //collide crates with world and player
    game.physics.arcade.collide(crate, platforms);

    //make crate move if touched by player
    if (game.physics.arcade.collide(crate, player)) {
      
    }

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
};

game.state.add("GameState", GameState);
game.state.start("GameState")
