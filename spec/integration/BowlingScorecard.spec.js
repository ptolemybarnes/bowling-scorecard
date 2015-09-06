describe("Scorecard Engine", function() {
  var scorecardEngine;

  beforeEach(function() {
    scorecardEngine = new ScorecardEngine();
  });

  it('scores a game without bonuses', function() {
    registerScores([3, 3, 3, 4, 5, 4, 6, 3]);

    expect(scorecardEngine.calculateTotal()).toEqual(3 + 3 + 3 + 4 + 5 + 4 + 6 + 3);
  })

  it('scores a game with bonuses', function() {
    registerScores([2,2, 6, 4, 9, 0, 4, 6, 10, 4, 3])

    expect(scorecardEngine.calculateTotal()).toEqual(76);
  });

  it('scores a perfect game', function() {
    registerScores([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
    
    expect(scorecardEngine.calculateTotal()).toEqual(300);
  });

  function registerScores(scores) {
    scores.forEach(function(score) {
      scorecardEngine.addScore(score)
    });
  }
});
