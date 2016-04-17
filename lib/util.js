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
