var ScorecardEngine = (function() {
  
  function ScorecardEngine() {
    this.frames = new FrameCollection([new Frame()]);
  }

  ScorecardEngine.prototype.addScore = function(value) {
    if(isFrameAddable(this)) {
      var frame = setFrameType(this);
      this.frames.push(frame);
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

  function setFrameType(engine) {
    var frame = new Frame();
    if (engine.frames.countFrames() == 9) {
      frame.setTenthFrame();
    }
    return frame;
  }

  return ScorecardEngine;
})();
