var Frame = (function() {
  
  function Frame(bonusMode) {
    this.rolls    = [];
    setMaxRollsAndScore(this, (bonusMode || true));
  }

  Frame.prototype.roll = function(score) {
    validateRoll(this, score)
    this.rolls.push(score);
  }

  Frame.prototype.isOver = function() {
    if (this.rolls.length >= this.maxRolls) { return true }
    if (this.isTenthFrame && this.rolls.length > 1) { return (calculateBaseScore(this) < 10) }
    else { return (calculateBaseScore(this) === this.maxScore) }
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

  Frame.prototype.isNullFrame  = function() {
    return false;
  }

  Frame.prototype.setTenthFrame = function() {
    setMaxRollsAndScore(this, false);
  }
  
  function calculateBonuses(frame, nextFrame, frameAfterNext) {
    var bonusTotal = 0;
    if (isSpare(frame)) {
      bonusTotal += nextFrame.getRollsList()[0];
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
    return calculateBaseScore({ getRollsList: function() { return rollsList.slice(0, 2) }})
  }

  function setMaxRollsAndScore(frame, bonusMode) {
    if (bonusMode) {
      frame.maxRolls     = 2;
      frame.maxScore     = 10;
      frame.isTenthFrame = false
    }
    else {
      frame.maxRolls     = 3;
      frame.maxScore     = 30;
      frame.isTenthFrame = true
    }
  }

  return Frame;
})();
