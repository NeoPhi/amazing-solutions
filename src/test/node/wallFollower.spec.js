describe('wallFollower', function() {
  var _ = require('underscore');
  var module = require('../../main/node/wallFollower');
  var solver;
  var room;
  var exitWest = {
    x: -1,
    y: 0,
    z: 0
  };
  var exitEast = {
    x: 1,
    y: 0,
    z: 0
  };
  var exitSouth = {
    x: 0,
    y: 1,
    z: 0
  };
  var exitNorth = {
    x: 0,
    y: -1,
    z: 0
  };

  beforeEach(function() {
    room = {
      x: 0,
      y: 0,
      z: 0
    };
  });

  it('rotates correctly for E exit', function() {
    solver = module.create();
    room.exits = [exitEast];
    var location = solver.next(room);
    expect(location).toBe(exitEast);
    expect(solver.getDirection()).toBe('E');
  });

  it('backtracks correctly', function() {
    solver = module.create();
    room.exits = [exitNorth];
    var location = solver.next(room);
    expect(location).toBe(exitNorth);
    expect(solver.getDirection()).toBe('N');
  });

  it('rotates from S to E', function() {
    solver = module.create();
    room.exits = [exitEast, exitSouth];
    var location = solver.next(room);
    expect(location).toBe(exitEast);
    expect(solver.getDirection()).toBe('E');
  });

  it('rotates from W to S', function() {
    solver = module.create('W');
    room.exits = [exitEast, exitSouth];
    var location = solver.next(room);
    expect(location).toBe(exitSouth);
    expect(solver.getDirection()).toBe('S');
  });

  it('follows a simple path', function() {
    solver = module.create('S');
    room.x = -1;
    room.exits = [{
      x: 0,
      y: 0,
      z: 0
    }];
    var location = solver.next(room);
    expect(location).toEqual({
      x: 0,
      y: 0,
      z: 0
    });
    expect(solver.getDirection()).toBe('E');
    room.x = 0;
    room.exits = [exitWest, exitSouth];
    location = solver.next(room);
    expect(location).toBe(exitSouth);
    expect(solver.getDirection()).toBe('S');
  });
});
