document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');

  var game = new Game(ctx);
  game.draw();
});
