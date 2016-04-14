/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1),
	    Game = __webpack_require__(2),
	    GameView = __webpack_require__(5);

	document.addEventListener('DOMContentLoaded', function () {
	  var canvas = document.getElementById('canvas');
	  var skierSpriteMap = document.getElementById('skier');
	  var obstacleSpriteMap = document.getElementById('obstacles');
	  var ctx = canvas.getContext('2d');

	  var game = new Game(skierSpriteMap, obstacleSpriteMap);
	  var gameView = new GameView(game, ctx);
	  canvas.addEventListener('mousemove', function(e){
	    game.skier.pos[0] = e.clientX;
	    game.skier.pos[1] = e.clientY;
	  });

	  gameView.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Util = {
	  inherits: function (childClass, parentClass) {
	    function Surrogate () {}
	    Surrogate.constructor = childClass;
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	  },
	  randVel: function () {
	    var vel = [];

	    for (var i = 0; i < 2; i++) {
	      vel.push(Math.floor(Math.random() * 10));
	    }

	    return [0, -10];
	  },
	  randPos: function () {
	    var pos = [];

	    for (var i = 0; i < 2; i++) {
	      pos.push(Math.floor(Math.random() * 500));
	    }

	    return pos;
	  },
	  newTreePos: function () {
	    var pos = [];
	    pos.push(Math.floor(Math.random() * 500));
	    pos.push(500);
	    return pos;
	  },
	  wrapPos: function (pos) {
	    if (pos[0] > 500) {
	      pos[0] = 0;
	    }

	    if (pos[1] > 500) {
	      pos[1] = 0;
	    }

	    if (pos[0] < 0) {
	      pos[0] = 500;
	    }

	    if (pos[1] < 0) {
	      pos[1] = 500;
	    }
	  }
	};

	module.exports = Util;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1),
	    Skier = __webpack_require__(3),
	    Tree = __webpack_require__(4);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);

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


/***/ },
/* 5 */
/***/ function(module, exports) {

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

	module.exports = GameView;


/***/ }
/******/ ]);