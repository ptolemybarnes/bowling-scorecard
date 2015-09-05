function Scorecard(frames) {
  this.frames = frames;
}

Scorecard.prototype.calculateTotal = function() {
  return [0].concat(this.frames).reduce(function(sum, frame) {
    return sum + frame.calculateScore();
  });
}

