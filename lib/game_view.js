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

GameView.prototype.reset = function () {
  if (this.game.isSkierCaught) {
    this.game.reset();
  }
};

module.exports = GameView;
