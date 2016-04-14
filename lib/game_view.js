var GameView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  tick = setInterval(function () {
    this.game.draw(this.ctx);
    this.game.step();
  }.bind(this), 30);
};

module.exports = GameView;
