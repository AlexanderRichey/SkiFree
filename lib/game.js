var Util = require('./util'),
    Skier = require('./skier'),
    Tree = require('./tree'),
    Yeti = require('./yeti');

var Game = function (skierSpriteMap, obstacleSpriteMap) {
  this.skierSpriteMap = skierSpriteMap;
  this.obstacleSpriteMap = obstacleSpriteMap;

  NUM_TREES = 5;
  this.trees = [];

  this.skier = new Skier(this.skierSpriteMap);
  this.yeti = new Yeti(this.skierSpriteMap);
  this.addTrees();

  this.paused = false;
  this.score = 0;
  this.crashCount = 0;
  this.isSkierCaught = false;

  this.mousePos = [250, 250];
};

Game.prototype.reset = function () {
  NUM_TREES = 5;
  this.trees = [];

  this.skier = new Skier(this.skierSpriteMap);
  this.yeti = new Yeti(this.skierSpriteMap);
  this.addTrees();

  this.paused = false;
  this.score = 0;
  this.crashCount = 0;
  this.isSkierCaught = false;

  this.mousePos = [250, 250];
};

Game.prototype.addTrees = function (spriteMap) {
  for (var i = 0; i < NUM_TREES; i++) {
    this.trees.push(
      new Tree(Util.randPos(), this.obstacleSpriteMap)
    );
  }
};

Game.prototype.removeElapsed = function () {
  for (var i = 0; i < this.trees.length; i++) {
    if (this.trees[i].pos[1] < -50) {
      delete this.trees[i];
    }
  }

  var newTrees = [];
  for (i = 0; i < this.trees.length; i++) {
    if (this.trees[i] !== undefined) {
      newTrees.push(this.trees[i]);
    }
  }

  this.trees = newTrees;
};

Game.prototype.rebalanceTrees = function () {
  this.removeElapsed();

  for (var i = this.trees.length; i < NUM_TREES; i++) {
    this.trees.push(
      new Tree(Util.newTreePos(), this.obstacleSpriteMap)
    );
  }
};

Game.prototype.checkCollision = function () {
  for (var i = 0; i < this.trees.length; i++) {
    if (
        (
          Math.sqrt(
          Math.pow((this.trees[i].pos[0] - this.skier.pos[0]), 2) +
          Math.pow((this.trees[i].pos[1] - this.skier.pos[1]), 2)
          ) < 20
        ) &&
        this.trees[i].colided === false
      ) {
      this.colide(this.trees[i]);
      return;
    } else {
      this.skier.ok();
    }
  }
};

Game.prototype.colide = function (obstacle) {
  this.skier.colide();
  obstacle.colided = true;
  this.paused = true;
  this.crashCount += 1;
  this.score -= 100;
  setTimeout(function () {
    this.paused = false;
  }.bind(this), 1000);
};

Game.prototype.checkCaught = function () {
  if (
        Math.sqrt(
        Math.pow((this.yeti.pos[0] - this.skier.pos[0]), 2) +
        Math.pow((this.yeti.pos[1] - this.skier.pos[1]), 2)
        ) < 20
      ) {
        this.catchSkier();
  }
};

Game.prototype.catchSkier = function () {
  this.isSkierCaught = true;
  this.paused = true;
  this.yeti.catchSkier();
  this.skier.getCaught();
};

Game.prototype.tallyScore = function () {
  this.score += 1;

  if (this.score > 1000) {
    NUM_TREES = 25;
  } else if (this.score > 750) {
    NUM_TREES = 11;
  } else if (this.score > 500) {
    NUM_TREES = 8;
  } else {
    NUM_TREES = 5;
  }
};

Game.prototype.drawStats = function (ctx) {
  var score = "Score: " + this.score;
  var crash = "Crashes: " + this.crashCount;

  ctx.font = "18px 'PT Sans'";
  ctx.fillText(score, 10, 20);
  ctx.fillText(crash, 120, 20);

  this.gameOverMessage(ctx);
};

Game.prototype.gameOverMessage = function (ctx) {
  if (this.isSkierCaught) {
    ctx.font = "40px 'PT Sans'";
    var gameOverMessage = "You are Yeti food";
    var gameOverTextWidth = ctx.measureText(gameOverMessage).width;
    ctx.fillText(
      gameOverMessage,
      (canvas.width/2) - (gameOverTextWidth / 2),
      100
    );

    ctx.font = "18px 'PT Sans'";
    var playAgainMessage = "Click to play again";
    var playAgainTextWidth = ctx.measureText(playAgainMessage).width;
    ctx.fillText(
      playAgainMessage,
      (canvas.width/2) - (playAgainTextWidth / 2),
      400
    );
  }
};

Game.prototype.moveObjects = function () {
  this.skier.move(this.mousePos);
  this.yeti.move(this.skier.pos);
  this.trees.forEach(function (tree) {
    tree.move();
  });
};

Game.prototype.step = function () {
  if (this.isSkierCaught) {
    this.paused = true;
  }
  if (!this.paused) {
    this.moveObjects();
    this.tallyScore();
    this.rebalanceTrees();
    this.checkCollision();
    this.checkCaught();
  } else {
    this.yeti.catchUp();
    this.checkCaught();
  }
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, 500, 500);

  this.trees.forEach(function (tree) {
    tree.draw(ctx);
  });
  this.skier.draw(ctx);
  this.yeti.draw(ctx);
  this.drawStats(ctx);
};

module.exports = Game;
