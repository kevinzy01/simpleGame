var cursor;
var spacebar;
var start;
var level;


//first game screen
  var screen1 = {
      create: function () {
        //Starting game physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //adding bg and setting world limits
        var bg = this.add.sprite(0, 0, "bg");
        bgWidth = bg.width;
        bgHeight = bg.height;

        // game.world.setBounds(0, 0, 1750, 1750)

        //platforms that is possible to jump on
        platforms = this.add.group();

        //enable physics for any object created in the group;
        platforms.enableBody = true;

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
        createDiamond(815, 210)

        //adding stars //substract 272 from central platform x
        stars = this.add.group();
        stars.enableBody = true;
        create3Stars(302, 510);
        create3Stars(527, 410);
        create3Stars(177, 310);
        create3Stars(480, 160);

        //add a score
        scoreText = game.add.text(16, 16, "Stars: 0 / " + totalStars , {fontSize: "32px", fill: "#000"})
        scoreText.fixedToCamera = true;

        // add hp
        hpText = game.add.text(250, 16, "HP: " + hp, {fontSize: "32px", fill: "#000"})
        hpText.fixedToCamera = true;

      },

      update: function () {
        //check collision
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
    };
