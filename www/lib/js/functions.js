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

function createDiamond(x, y, scr) {
    var diamond = diamonds.create(x, y, "diamond");
    //add 1 to diamonds count
    totalDia +=  1;
    //make diamond bigger
    diamond.scale.setTo(1.25, 1.25);
    // start next screen
    game.state.start('"' + scr + '"')
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
