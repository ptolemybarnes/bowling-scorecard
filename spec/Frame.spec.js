
describe('Frame', function() {
  var frame, nextFrame, frameAfterNext;

  beforeEach(function() {
    frame          = new Frame();
    nextFrame      = new Frame();
    frameAfterNext = new Frame();
  });

  describe('Calculating the score', function() { 

    describe('when it is neither a spare or a strike' , function() {

      it('gives a base score', function() {
        rolls([6, 2]);

        expect(frame.calculateScore(nextFrame, frameAfterNext)).toEqual(8);
      });

    });

    describe("when it is a spare", function() {

      it('awards itself bonus points equal to the score of the next roll', function() {
        rolls([5,5]);
        nextFrame.roll(3);
        nextFrame.roll(3);

        expect(frame.calculateScore(nextFrame, frameAfterNext)).toEqual(13);
      });

    });

    describe("when it is a strike followed by a non-strike", function() {

      it('awards itself bonus points equal to the base score of the next frame', function() {
        rolls([10]);
        nextFrame.roll(3);
        nextFrame.roll(3);

        expect(frame.calculateScore(nextFrame, frameAfterNext)).toEqual(16);
      });

    });

    describe("when it is a strike followed by another strike", function() {

      it('awards itself bonus points equal to the base score of the next two frames', function() {
        frame.roll(10);
        nextFrame.roll(10);
        frameAfterNext.roll(3);

        expect(frame.calculateScore(nextFrame, frameAfterNext)).toEqual(23);
      });

    });

    describe('when no rolls have been thrown', function() {

      it('returns zero as the score', function() {
        expect(frame.calculateScore(new NullFrame(), new NullFrame())).toEqual(0);
      });

    });

  });

  describe('Validations', function() { 

    it("doesn't allow a third roll", function() {
      rolls([1,2]);

      expect(function() { frame.roll(3) }).toThrow("No more rolls; frame is over");
    });

    it("doesn't allow the score to go over 10", function() {
      rolls([5]);

      expect(function() { frame.roll(6) }).toThrow("You cannot knock down more than 10 pins");
    });

  });

  describe('knows it is not over', function() {

    it('after a single roll of less than 10', function() {
      frame.roll(3);

      expect(frame.isOver()).toEqual(false);
    });

  });

  describe('when is it the tenth frame', function() {

    beforeEach(function() {
      frame.setTenthFrame();
    });

    it('allows a bonus roll after a spare', function() {
      rolls([5, 5, 5]);

      expect(frame.calculateScore(new NullFrame(), new NullFrame())).toEqual(15);
    });

    it('is over after 2 rolls not adding up to 10', function() {
      rolls([5, 4]);

      expect(frame.isOver()).toEqual(true);
    });

    it('is not over after a single roll not add up to 10', function() {
      rolls([5]);

      expect(frame.isOver()).toEqual(false);
    });

    it('is not over after a strike', function() {
      rolls([10]);

      expect(frame.isOver()).toEqual(false);
    });

  });
    
  function rolls(multiRolls) {
    multiRolls.forEach(function(roll) {
      frame.roll(roll);
    });
  }
});

