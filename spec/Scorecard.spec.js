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
      var firstFrame  = frames[0]
      spyOn(firstFrame, 'calculateScore');
      scorecard       = new Scorecard(frames);

      scorecard.calculateTotal();

      expect(firstFrame.calculateScore).toHaveBeenCalledWith(frames[1], frames[2]);
    });

  });

  function generateFramesWithScores(frameScores) {
    return frameScores.map(function(frameScore) {
      return { 
        calculateScore: function() { 
          return frameScore.reduce(function(total, score) {
            return total + score;
          });
        }
      }
    });
  }

});
