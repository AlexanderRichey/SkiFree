var Util = require('./util'),
    Skier = require('./skier'),
    Tree = require('./tree');

var Game = function (skierSpriteMap, obstacleSpriteMap) {
  this.skierSpriteMap = skierSpriteMap;
  this.obstacleSpriteMap = obstacleSpriteMap;

  NUM_TREES = 5;
  this.trees = [];

  this.skier = new Skier([250, 250], this.skierSpriteMap);
  this.addTrees(this.obstacleSpriteMap);
};

Game.prototype.addTrees = function (spriteMap) {
  for (var i = 0; i < NUM_TREES; i++) {
    this.trees.push(
      new Tree(Util.randPos(), spriteMap)
    );
  }
};

Game.prototype.checkCollision = function () {
  this.trees.forEach(function (tree) {
    if (
      Math.sqrt(
        Math.pow((tree.pos[0] - tree.pos[1]), 2) +
        Math.pow((this.skier.pos[0] - this.skier.pos[1]), 2)
      ) < 10) {
      console.log('COLLISION');
    }
  }.bind(this));
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

Game.prototype.moveObjects = function () {
  this.trees.forEach(function (tree) {
    tree.move();
  });
};

Game.prototype.step = function () {
  this.rebalanceTrees();
  this.checkCollision();
  this.moveObjects();
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, 500, 500);

  this.skier.draw(ctx);

  this.trees.forEach(function (tree) {
    tree.draw(ctx);
  });
};

module.exports = Game;
