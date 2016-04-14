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
