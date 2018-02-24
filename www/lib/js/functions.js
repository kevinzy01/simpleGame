//functions
function createMinimizedItem(x, y, image) {
  let item = platforms.create(x, y, image);
  item.scale.setTo(.5, .5);
  item.body.immovable = true;
}

function createMinimizedWater(x, y, image) {
  let item = water.create(x, y, image);
  item.scale.setTo(.5, .5);
}

function createMaximizedItem(x, y, image) {
  let item = platforms.create(x, y, image);
  item.scale.setTo(1.5, 1.5);
  item.body.immovable = true;
}

function createItem(x, y, image) {
  let item = platforms.create(x, y, image);
  item.body.immovable = true;
}

function createCrate(x, y, image) {
  let item = crates.create(x, y, image);
  //add physics to crate
  game.physics.arcade.enable(crates);
  item.body.immovable = false;
  item.body.gravity.y = 500;
  item.body.collideWorldBounds = true;
  item.body.drag.x = 100;
}

function create3Stars(x, y) {
  for (var i = 250; i < 370; i+= 40) {
    //create a star inside star group
    let star = stars.create(i + x, y, "star")
    //make stars static
    star.body.gravity.y = 0;
    totalStars++;
  }
}

function create2Stars(x, y) {
  for (var i = 250; i < 330; i+= 40) {
    //create a star inside star group
    let star = stars.create(i + x, y, "star")
    //make stars static
    star.body.gravity.y = 0;
    totalStars++;
  }
}

function createDiamond(x, y, scr) {
    let diamond = diamonds.create(x, y, "diamond");
    //make diamond bigger
    diamond.scale.setTo(1.25, 1.25);
};

function createPlatform(x, y, leftTile, middleTile, rightTile) {
  let plat = platforms.create(x, y, middleTile);
  plat.body.immovable = true;
  plat.scale.setTo(.5, .5);
  let plat1 = platforms.create(x - 64, y, leftTile );
  plat1.body.immovable = true;
  plat1.scale.setTo(.5, .5);
  let plat2 = platforms.create(x + 64, y, rightTile);
  plat2.body.immovable = true;
  plat2.scale.setTo(.5, .5);
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
  //add diamond sound
  game.state.start("screen2")
};

function killPlayer(player, water) {
  // kill player
  player.kill();
  //reload level
  game.state.reload()
}
