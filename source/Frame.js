var Frame = (function() {
  
  function Frame(bonusMode) {
    this.rolls    = [];
    this.maxRolls = 2;
    this.maxScore = 10;
    this.bonusMode = bonusMode || true;
  }

  Frame.prototype.roll = function(score) {
    validateRoll(this, score)
    this.rolls.push(score);
  }

  Frame.prototype.isOver = function() {
    return (this.rolls.length > 1 || calculateBaseScore(this) === this.maxScore);
  }

  Frame.prototype.calculateScore = function(nextFrame, frameAfterNext) {
    var total = 0;
    total += calculateBaseScore(this);
    if (this.bonusMode) {
      total += calculateBonuses(this, nextFrame, frameAfterNext);
    }

    return total;
  };

  Frame.prototype.getRollsList = function() {
    return this.rolls.slice(0, this.rolls.length);
  }

  Frame.prototype.isNullFrame  = function() {
    return false;
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
    if (frame.rolls.length == frame.maxRolls) {
      throw "No more rolls; frame is over";
    }
    if (calculateBaseScore(frame) + score > frame.maxScore) {
      throw "You cannot knock down more than 10 pins";
    }
  }

  function countNumberOfRolls(frame) {
    return frame.rolls.length;
  }

  function calculateBaseScore(frame) {
    return [0].concat(frame.getRollsList()).reduce(function(sum, score) {
      return sum + (score || 0);
    });
  }

  function getNextTwoScores(nextFrame, frameAfterNext) {
    var rollsList = nextFrame.getRollsList().concat(frameAfterNext.getRollsList());
    return calculateBaseScore({ getRollsList: function() { return rollsList }})
  }

  return Frame;
})();
