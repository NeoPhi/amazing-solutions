var _ = require('underscore');

var rotateTest = {
  S: {
    x: 1,
    y: 0,
    rotate: 'E'
  },
  E: {
    x: 0,
    y: -1,
    rotate: 'N'
  },
  N: {
    x: -1,
    y: 0,
    rotate: 'W'
  },
  W: {
    x: 0,
    y: 1,
    rotate: 'S'
  }
};

var forwardTest = {
  S: {
    x: 0,
    y: 1,
    rotate: 'W'
  },
  E: {
    x: 1,
    y: 0,
    rotate: 'S'
  },
  N: {
    x: 0,
    y: -1,
    rotate: 'E'
  },
  W: {
    x: -1,
    y: 0,
    rotate: 'N'
  }
};

function hasExit(room, delta) {
  var targetX = room.x + delta.x;
  var targetY = room.y + delta.y;
  return _.any(room.exits, function(exit) {
    return ((exit.x === targetX) && (exit.y === targetY));
  });
}

function getExit(room, delta) {
  var targetX = room.x + delta.x;
  var targetY = room.y + delta.y;
  return _.find(room.exits, function(exit) {
    return ((exit.x === targetX) && (exit.y === targetY));
  });
}

function WallFollower(direction) {
  this.direction = direction || 'S';
}

WallFollower.prototype.next = function(room) {
  var rotateCheck = rotateTest[this.direction];
  if (hasExit(room, rotateCheck)) {
    this.direction = rotateCheck.rotate;
    return getExit(room, rotateCheck);
  }
  while (true) {
    var forwardCheck = forwardTest[this.direction];
    if (hasExit(room, forwardCheck)) {
      return getExit(room, forwardCheck);
    }
    this.direction = forwardCheck.rotate;
  }
};

WallFollower.prototype.getDirection = function() {
  return this.direction;
};

function create(direction) {
  return new WallFollower(direction);
}

module.exports.name = 'NeoPhi wallFollower';
module.exports.create = create;
