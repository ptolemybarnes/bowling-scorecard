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
    total += calculateBaseScore(this);
    total += calculateBonuses(this, nextFrame, frameAfterNext);

    return total;
  };

  Frame.prototype.getRollsList = function() {
    return this.rolls.slice(0, this.rolls.length);
  }
  
  // private methods.
  
  function calculateBonuses(frame, nextFrame, frameAfterNext) {
    var bonusTotal = 0;
    if (isSpare(frame)) {
      bonusTotal += nextFrame.rolls[0];
    }
    if (isStrike(frame)) {
      bonusTotal += getNextTwoScores(nextFrame, frameAfterNext);
    }
    return bonusTotal;
  }

  function isSpare(frame) { 
    return (countNumberOfRolls(frame) > 1 && calculateBaseScore(frame) === 10);
  };

  function isStrike(frame) {
    return (countNumberOfRolls(frame) == 1 && calculateBaseScore(frame) === 10);
  }

  function validateRoll(frame, score) {
    if (frame.rolls.length == 2) {
      throw "No more rolls; frame is over";
    }
    if (calculateBaseScore(frame) + score > 10) {
      throw "You cannot knock down more than 10 pins";
    }
  }

  function countNumberOfRolls(frame) {
    return frame.rolls.length;
  }

  function calculateBaseScore(frame) {
    return frame.rolls[0] + (frame.rolls[1] || 0);
  }

  function getNextTwoScores(nextFrame, frameAfterNext) {
    var rollsList = nextFrame.getRollsList().concat(frameAfterNext.getRollsList());
    return calculateBaseScore({ rolls: rollsList });
  }

  return Frame;
})();
