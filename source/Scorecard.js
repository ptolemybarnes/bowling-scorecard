var Scorecard = (function() { 
  function Scorecard(frames) {
    this.frames = frames;
  }

  Scorecard.prototype.calculateTotal = function() {
    var frames = this.frames;
    return this.frames.reduce(function(sum, frame, index, _) {
      return sum + frame.calculateScore(frames.getFrame(index), frames.getFrame(index + 1));
    });
  }
  
  return Scorecard;
})();


