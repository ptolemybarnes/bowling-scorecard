var Scorecard = (function() { 
  function Scorecard(frames) {
    this.frames = frames;
  }

  Scorecard.prototype.calculateTotal = function() {
    return [0].concat(this.frames).reduce(function(sum, frame, index, frames) {
      return sum + frame.calculateScore(frames[index + 1], frames[index + 2]);
    });
  }
  
  return Scorecard;
})();


