var Frame = (function() {
  
  function Frame() {
    this.rolls = [];
  }

  Frame.prototype.roll = function(score) {
    validateRoll(this.rolls);
    this.rolls.push(score);
  }

  Frame.prototype.isOver = function() {
    return (this.rolls.length > 1 || this.calculateScore() === 10);
  }

  Frame.prototype.calculateScore = function() {
    var total = 0;
    this.rolls.forEach(function(score) { total += score });
    return total;
  };

  Frame.prototype.isSpare = function() {
    return (countNumberOfRolls(this.rolls) > 1 && this.calculateScore() === 10);
  };

  Frame.prototype.isStrike = function() {
    return (countNumberOfRolls(this.rolls) == 1 && this.calculateScore() === 10);
  }

  // private methods. You must use 'self', rather than this.

  function validateRoll(rolls) {
    if (rolls.length == 2) {
      throw "No more rolls; frame is over";
    }
  }

  function countNumberOfRolls(rolls) {
    return rolls.length;
  }

  return Frame;
})();
