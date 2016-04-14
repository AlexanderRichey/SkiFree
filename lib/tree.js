var Util = require('./util');

var Tree = function (pos, spriteMap) {
  this.spriteMap = spriteMap;
  this.pos = pos;
  this.vel = Util.randVel();
  this.radius = 40;
  this.color = 'green';
};

Tree.prototype.draw = function (ctx) {
  ctx.drawImage(
    this.spriteMap,
    95, 66, 32, 64,
    this.pos[0], this.pos[1], 32, 64
  );
};

Tree.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

module.exports = Tree;
