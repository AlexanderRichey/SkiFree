var Yeti = function (spriteMap) {
  this.spriteMap = spriteMap;
  this.pos = [250, -100];
  this.frame = 0;
  this.frameTimer = 0;
  this.vel = 0.05;
  this.isCaughtSkier = false;
};

Yeti.prototype.pushLeft = function () {
  this.vel += 0.05;
};

Yeti.prototype.pushRight = function () {
  this.vel -= 0.05;
};

Yeti.prototype.move = function (newPos) {
  if (newPos[0] > this.pos[0]) {
    this.pushLeft();
  } else if (newPos[0] < this.pos[0]) {
    this.pushRight();
  }

  this.pos[0] += this.vel;
};

Yeti.prototype.catchUp = function () {
  if (this.isCaughtSkier === true) { return; }

  this.pos[0] += this.vel;

  if (this.pos[1] < 250) {
    this.pos[1] += 1.5;
  }
};

Yeti.prototype.catchSkier = function () {
  this.isCaughtSkier = true;
};

Yeti.prototype.incrementTimer = function (callback) {
  if (this.frameTimer > 6) {
    this.frameTimer = 0;

    if (callback) {
      callback();
      return;
    }

    this.switchFrame();
  } else {
    this.frameTimer += 1;
  }
};

Yeti.prototype.switchFrame = function () {
  if (this.frame === 0) {
    this.frame = 1;
  } else if (this.frame === 1) {
    this.frame = 0;
  } else if (this.frame > 1) {
    this.frame = 0;
  }
};

Yeti.prototype.draw = function (ctx) {
  if (this.isCaughtSkier) {
    this.eatSkier(ctx);
    return;
  }

  this.incrementTimer();

  if (this.vel > 0) {
    switch (this.frame) {
      case 0:
        ctx.drawImage(
          this.spriteMap,
          91, 112, 31, 40,
          this.pos[0], this.pos[1], 31, 40
        );
        break;
      case 1:
        ctx.drawImage(
          this.spriteMap,
          62, 112, 29, 40,
          this.pos[0], this.pos[1], 29, 40
        );
        break;
    }
  } else if (this.vel < 0) {
    switch (this.frame) {
      case 0:
        ctx.drawImage(
          this.spriteMap,
          91, 158, 31, 40,
          this.pos[0], this.pos[1], 31, 40
        );
        break;
      case 1:
        ctx.drawImage(
          this.spriteMap,
          62, 158, 29, 40,
          this.pos[0], this.pos[1], 29, 40
        );
        break;
    }
  }
};

Yeti.prototype.eatSkier = function (ctx) {
  this.incrementTimer(function () {
    if (this.frame > 6) {
      if (this.frame === 7) {
        this.frame = 8;
      } else if (this.frame === 8) {
        this.frame = 7;
      }
    } else {
      this.frame += 1;
    }
  }.bind(this));

  switch (this.frame) {
    case 0:
      ctx.drawImage(
        this.spriteMap,
        35, 112, 25, 43,
        this.pos[0], this.pos[1], 25, 43
      );
      break;
    case 1:
      ctx.drawImage(
        this.spriteMap,
        0, 112, 32, 43,
        this.pos[0], this.pos[1], 32, 43
      );
      break;
    case 2:
      ctx.drawImage(
        this.spriteMap,
        122, 112, 34, 43,
        this.pos[0], this.pos[1], 34, 43
      );
      break;
    case 3:
      ctx.drawImage(
        this.spriteMap,
        156, 112, 31, 43,
        this.pos[0], this.pos[1], 31, 43
      );
      break;
    case 4:
      ctx.drawImage(
        this.spriteMap,
        187, 112, 31, 43,
        this.pos[0], this.pos[1], 31, 43
      );
      break;
    case 5:
      ctx.drawImage(
        this.spriteMap,
        219, 112, 25, 43,
        this.pos[0], this.pos[1], 25, 43
      );
      break;
    case 6:
      ctx.drawImage(
        this.spriteMap,
        243, 112, 26, 43,
        this.pos[0], this.pos[1], 26, 43
      );
      break;
    case 7:
      ctx.drawImage(
        this.spriteMap,
        35, 112, 25, 43,
        this.pos[0], this.pos[1], 25, 43
      );
      break;
    case 8:
      ctx.drawImage(
        this.spriteMap,
        0, 112, 32, 43,
        this.pos[0], this.pos[1], 32, 43
      );
      break;
  }
};

module.exports = Yeti;
