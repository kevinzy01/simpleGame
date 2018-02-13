var game = new Phaser.Game(1000, 750, Phaser.AUTO, '');
var platforms;
var player;
var cursor;
var stars;
var crate;
var diamonds;
var diaCount = 0;
var totalDia = 0;
var starCount = 0;
var totalStars = 0;
var scoreText;
var decoration;
var buttons;
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
  var item = crates.create(x, y, image);
  item.body.immovable = false;
  //add physics to item
  item.body.gravity.y = 500;
  item.body.collideWorldBounds = true;
  game.physics.arcade.enable(item);
  item.body.drag.x = 100;
}

function create3Stars(x, y) {
  for (var i = 250; i < 370; i+= 40) {
    //create a star inside star group
    var star = stars.create(i + x, y, "star")
    //make stars static
    star.body.gravity.y = 0;
    totalStars++;
  }
}

function create2Stars(x, y) {
  for (var i = 250; i < 330; i+= 40) {
    //create a star inside star group
    var star = stars.create(i + x, y, "star")
    //make stars static
    star.body.gravity.y = 0;
    totalStars++;
  }
}

function createDia(x, y) {
    var diamond = diamonds.create(x, y, "diamond");
    //add 1 to diamonds count
    totalDia +=  1;
    //make diamond bigger
    diamond.scale.setTo(1.25, 1.25)
};

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

function collectStar (player, stars) {
  //remove star
  stars.kill()
  //add 10 points to score
  starCount += 1;
  scoreText.text = "Stars: " + starCount + " / " + totalStars;
  //add star sound
  starSound.play()
};

function collectDia (player, diamonds) {
  //remove star
  diamonds.kill()
  //add 10 points to score
  diaCount += 1;
  //add diamond sound
};

//start screen
var startScreen = {
  preload: function () {
    this.load.image("bg", "assets/bg/platform/BG/BG.png")
    this.load.image("tree", "assets/bg/platform/Object/Tree_1.png")
    this.load.image("stone", "assets/bg/platform/Object/Stone.png")
    this.load.image("stone", "assets/bg/platform/Object/Stone.png")
    this.load.image("start", "assets/Button.png")
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
    createMinimizedItem(bgWidth / 2, bgHeight / 2, "start")
  },

}

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

      //adding diamond
      diamonds = this.add.group();
      diamonds.enableBody = true;
      createDia(816, 210)

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

      if (cursors.up.isDown && player.body.touching.down && playerHitCrate) {
        player.body.velocity.y = -400;
      }
    }
  };

game.state.add("startScreen", startScreen);
// game.state.add("GameState", GameState);
game.state.start("startScreen")
