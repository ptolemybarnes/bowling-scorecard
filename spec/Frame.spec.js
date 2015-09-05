
describe('Frame', function() {
  var frame;

  beforeEach(function() {
    frame = new Frame();
  });

  describe('knows its score' , function() {

    it('after two rolls', function() {
      rolls([6, 2]);

      expect(frame.calculateScore()).toEqual(8);
    });

  });

  describe('knows it is over', function() { 

    it('after two rolls', function() {
      rolls([2, 3]);

      expect(frame.isOver()).toEqual(true);
    });

    it('after a strike', function() {
      frame.roll(10);
      
      expect(frame.isOver()).toEqual(true);
    });

    it("doesn't allow a third roll", function() {
      rolls([1,2]);

      expect(function() { frame.roll(3) }).toThrow("No more rolls; frame is over");
    });

  });

  describe('knows it is not over', function() {

    it('after a single roll of less than 10', function() {
      frame.roll(3);

      expect(frame.isOver()).toEqual(false);
    });
  });

  it('knows it is a spare', function() {
    rolls([5, 5]);

    expect(frame.isSpare()).toEqual(true);
  });

  it('knows when it is a strike', function() {
    rolls([10]);

    expect(frame.isStrike()).toEqual(true);
  });

  function rolls(multiRolls) {
    multiRolls.forEach(function(roll) {
      frame.roll(roll);
    });
  }
});

