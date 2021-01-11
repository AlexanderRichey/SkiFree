var Util = require("./util"),
  Game = require("./game"),
  GameView = require("./game_view");

function init() {
  var canvas = document.getElementById("canvas");
  var skierSpriteMap = document.getElementById("skier");
  var obstacleSpriteMap = document.getElementById("obstacles");
  var ctx = canvas.getContext("2d");

  var game = new Game(skierSpriteMap, obstacleSpriteMap);
  var gameView = new GameView(game, ctx);
  canvas.addEventListener("mousemove", function (e) {
    game.mousePos[0] = e.clientX - canvas.offsetLeft;
    game.mousePos[1] = e.clientY;
  });

  canvas.addEventListener("click", function (e) {
    gameView.start();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
