describe("Scorecard", function() { 
  var scorecard;

  describe("when given non-bonus scoring frames", function() {

    it('calculates a grand total', function() {
      var frameScores = [[3,4],[3,3],[4,4]];
      var frames      = generateFramesWithScores(frameScores);
      scorecard       = new Scorecard(frames);
      expect(scorecard.calculateTotal()).toEqual(3 + 4 + 3 + 3 + 4 + 4);
  });

  function generateFramesWithScores(frameScores) {
    return frameScores.map(function(frameScore) {
      return { calculateScore: function() { 
          return frameScore.reduce(function(total, score) {
            return total + score;
          });
        }
      }
    });
  }

  });
});
