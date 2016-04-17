var Util = require('./util');

var Tree = function (pos, spriteMap) {
  this.spriteMap = spriteMap;
  this.type = Math.floor(Math.random() * 5);
  this.pos = pos;
  this.vel = [0, -10];
  this.radius = 40;
  this.color = 'green';
  this.colided = false;
};

Tree.prototype.draw = function (ctx) {
  switch (this.type) {
    case 1:
      ctx.drawImage(
        this.spriteMap,
        0, 28, 30, 34,
        this.pos[0], this.pos[1], 30, 34
      );
      break;
    case 2:
      ctx.drawImage(
        this.spriteMap,
        95, 66, 32, 64,
        this.pos[0], this.pos[1], 32, 64
      );
      break;
    case 3:
      ctx.drawImage(
        this.spriteMap,
        30, 52, 23, 11,
        this.pos[0], this.pos[1], 23, 11
      );
      break;
    case 4:
      ctx.drawImage(
        this.spriteMap,
        85, 138, 15, 32,
        this.pos[0], this.pos[1], 15, 32
      );
      break;
  }
};

Tree.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

module.exports = Tree;
