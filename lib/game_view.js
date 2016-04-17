var GameView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.isStarted = false;
};

GameView.prototype.start = function () {
  if (this.isStarted) {
    if (this.game.isSkierCaught) {
      this.game.reset();
    } else {
      return;
    }
  } else {
    this.isStarted = true;
    tick = setInterval(function () {
      this.game.draw(this.ctx);
      this.game.step();
    }.bind(this), 30);
  }
};

module.exports = GameView;
