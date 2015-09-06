var ScorecardEngine = (function() {
  
  function ScorecardEngine() {
    this.frames = new FrameCollection([new Frame()]);
  }

  ScorecardEngine.prototype.addScore = function(value) {
    if(isFrameAddable(this)) {
      this.frames.push(new Frame());
    }
    this.frames.getLastFrame().roll(value);
  }

  ScorecardEngine.prototype.calculateTotal = function() {
    var scorecard = new Scorecard(this.frames);
    return scorecard.calculateTotal();
  }

  function isFrameAddable(engine) {
    return (engine.frames.getLastFrame().isOver());
  }

  return ScorecardEngine;
})();
