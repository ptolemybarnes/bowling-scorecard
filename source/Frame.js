var Frame = (function() {
  
  function Frame() {
    this.rolls = [];
  }

  Frame.prototype.roll = function(score) {
    validateRoll(this, score)
    this.rolls.push(score);
  }

  Frame.prototype.isOver = function() {
    return (this.rolls.length > 1 || calculateBaseScore(this) === 10);
  }

  Frame.prototype.calculateScore = function(nextFrame, frameAfterNext) {
    var total = 0;
    this.rolls.forEach(function(score) { total += score });
    if (this.isSpare()) {
      total += nextFrame.rolls[0];
    }
    if (this.isStrike()) {
      total += (nextFrame.rolls[0] + nextFrame.rolls[1])
    }
    return total;
  };

  Frame.prototype.isSpare = function() {
    return (countNumberOfRolls(this.rolls) > 1 && calculateBaseScore(this) === 10);
  };

  Frame.prototype.isStrike = function() {
    return (countNumberOfRolls(this.rolls) == 1 && calculateBaseScore(this) === 10);
  }

  // private methods.

  function validateRoll(frame, score) {
    if (frame.rolls.length == 2) {
      throw "No more rolls; frame is over";
    }
    if (calculateBaseScore(frame) + score > 10) {
      throw "You cannot knock down more than 10 pins";
    }
  }

  function countNumberOfRolls(rolls) {
    return rolls.length;
  }

  function calculateBaseScore(frame) {
    return frame.rolls[0] + (frame.rolls[1] || 0);
  }

  return Frame;
})();
