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
	    GameView = __webpack_require__(6);

	document.addEventListener('DOMContentLoaded', function () {
	  var canvas = document.getElementById('canvas');
	  var skierSpriteMap = document.getElementById('skier');
	  var obstacleSpriteMap = document.getElementById('obstacles');
	  var ctx = canvas.getContext('2d');

	  var game = new Game(skierSpriteMap, obstacleSpriteMap);
	  var gameView = new GameView(game, ctx);
	  canvas.addEventListener('mousemove', function(e) {
	    game.mousePos[0] = e.clientX - canvas.offsetLeft;
	    game.mousePos[1] = e.clientY;
	  });


	  canvas.addEventListener('click', function (e) {
	    gameView.start();
	  });
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
	};

	module.exports = Util;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1),
	    Skier = __webpack_require__(3),
	    Tree = __webpack_require__(4),
	    Yeti = __webpack_require__(5);

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

	  ctx.fillStyle = "#000000";
	  ctx.font = "18px 'PT Sans'";
	  ctx.fillText(score, 10, 20);
	  ctx.fillText(crash, 120, 20);

	  this.gameOverMessage(ctx);
	};

	Game.prototype.gameOverMessage = function (ctx) {
	  if (this.isSkierCaught) {
	    ctx.fillStyle = "#000000";
	    ctx.font = "40px 'PT Sans'";
	    var gameOverMessage = "You are Yeti food";
	    var gameOverTextWidth = ctx.measureText(gameOverMessage).width;
	    ctx.fillText(
	      gameOverMessage,
	      (canvas.width/2) - (gameOverTextWidth / 2),
	      100
	    );

	    ctx.fillStyle = "#000000";
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
	  ctx.fillStyle = "#FFFFFF";
	  ctx.fillRect(0, 0, 500, 500);

	  this.trees.forEach(function (tree) {
	    tree.draw(ctx);
	  });
	  this.skier.draw(ctx);
	  this.yeti.draw(ctx);
	  this.drawStats(ctx);
	};

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);

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


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);