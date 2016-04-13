var Game = function (ctx) {
  this.ctx = ctx;
};

Game.prototype.draw = function () {
  this.ctx.fillStyle = 'rgb(215, 255, 255)';
  this.ctx.fillRect(0, 0, 500, 500);
};
