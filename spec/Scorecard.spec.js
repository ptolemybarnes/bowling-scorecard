describe("Scorecard", function() { 
  var scorecard;

  describe("Calculating total", function() {

    it('calculates a grand total', function() {
      var frames      = generateFramesWithScores([[3,4],[3,3],[4,4]]);
      scorecard       = new Scorecard(frames);

      expect(scorecard.calculateTotal()).toEqual(3 + 4 + 3 + 3 + 4 + 4);
    });

  });

  describe("Awarding bonuses", function() {

    it("passes subsequent two frames to each frame", function() {
      var frames      = generateFramesWithScores([[5,5],[3,3],[3,3]]);
      var firstFrame  = frames.getFrame(0);
      spyOn(firstFrame, 'calculateScore');

      scorecard       = new Scorecard(frames);
      scorecard.calculateTotal();

      expect(firstFrame.calculateScore).toHaveBeenCalledWith(frames.getFrame(1), frames.getFrame(2));
    });


  });

  function generateFramesWithScores(frameScores) {
    var frames = frameScores.map(function(frameScore) {
      return { 
        calculateScore: function() { 
          return frameScore.reduce(function(total, score) {
            return total + score;
          });
        }
      }
    });
    return new FrameCollection(frames);
  }

});
