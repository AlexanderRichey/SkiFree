var Skier = function (pos, spriteMap) {
  this.spriteMap = spriteMap;
  this.radius = 20;
  this.color = 'red';
  this.pos = pos;
};

Skier.prototype.draw = function (ctx) {
  ctx.drawImage(
    this.spriteMap,
    65, 0, 17, 34,
    this.pos[0], this.pos[1], 17, 34
  );
};

module.exports = Skier;
