var Skier = function (spriteMap) {
  this.spriteMap = spriteMap;
  this.radius = 20;
  this.color = 'red';
  this.pos = [250, 250];
  this.state = "OK";
  this.vel = 0;
  this.isCaught = false;
};

Skier.prototype.getCaught = function () {
  this.isCaught = true;
};

Skier.prototype.colide = function () {
  this.state = "COLIDE";
};

Skier.prototype.ok = function () {
  this.state = "OK";
};

Skier.prototype.isColide = function () {
  if (this.state === "COLIDE") {
    return true;
  } else {
    return false;
  }
};

Skier.prototype.isOk = function () {
  if (this.state === "OK") {
    return true;
  } else {
    return false;
  }
};

Skier.prototype.pushLeft = function () {
  this.vel += 0.2;
};

Skier.prototype.pushRight = function () {
  this.vel -= 0.2;
};

Skier.prototype.move = function (newPos) {
  if (newPos[0] > this.pos[0]) {
    this.pushLeft();
  } else if (newPos[0] < this.pos[0]) {
    this.pushRight();
  }

  if (!(this.pos[0] + this.vel >= 490 || this.pos[0] + this.vel <= 0)) {
    this.pos[0] += this.vel;
  }
};

Skier.prototype.draw = function (ctx) {
  if (this.isCaught) { return; }

  switch (this.state) {
    case "OK":
      if (this.vel > 0.5) {
        ctx.drawImage(
          this.spriteMap,
          49, 0, 17, 34,
          this.pos[0], this.pos[1], 17, 34
        );
      } else if (this.vel < -0.5) {
        ctx.drawImage(
          this.spriteMap,
          49, 37, 17, 34,
          this.pos[0], this.pos[1], 17, 34
        );
      } else {
        ctx.drawImage(
          this.spriteMap,
          65, 0, 17, 34,
          this.pos[0], this.pos[1], 17, 34
        );
      }
      break;
    case "COLIDE":
      ctx.drawImage(
        this.spriteMap,
        240, 0, 31, 31,
        this.pos[0], this.pos[1], 31, 31
      );
      break;
  }
};

module.exports = Skier;
