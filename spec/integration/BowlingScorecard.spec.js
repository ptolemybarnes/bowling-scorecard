describe("Integration test", function() {
  var frames;

  it('scores a game without bonuses', function() {
    frames              = generateFramesWithScores([[3,3],[3,4],[5,4],[6,3]]);
    var scorecard       = new Scorecard(frames);

    expect(scorecard.calculateTotal()).toEqual(3 + 3 + 3 + 4 + 5 + 4 + 6 + 3);
  })

  it('scores a game with bonuses', function() {
    frames              = generateFramesWithScores(
      [[2,2], [6, 4], [9, 0], [4, 6], [10], [4, 3]]
    )

    var scorecard       = new Scorecard(frames);

    expect(scorecard.calculateTotal()).toEqual(76);
  });

  function generateFramesWithScores(frameScores) {
    var frames = frameScores.map(function(frameScore) {
      var frame = new Frame();
      frameScore.forEach(function(rollScore) {
        frame.roll(rollScore);
      });
      return frame;
    });
    return new FrameCollection(frames);
  }

});
