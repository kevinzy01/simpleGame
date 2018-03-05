var gameOver = {
  create: function() {
    game.add.text(400, 350, "GAME OVER!", {fontSize: "64px", fill: "#ffffff"});

    reset = game.add.button(550, 475, 'reset', loadMenu, this, 2, 1, 0);

    function loadMenu () {
      game.state.start("menu")
    };

    reset.scale.setTo(.5, .5)
  },

  update: function () { }
}
