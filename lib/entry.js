var Util = require('./util'),
    Game = require('./game'),
    GameView = require('./game_view');

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
