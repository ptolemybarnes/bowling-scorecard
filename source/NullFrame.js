function NullFrame() {}

NullFrame.prototype.calculateScore = function() {
  return 0;
}

NullFrame.prototype.isNullFrame    = function() {
  return true;
}

NullFrame.prototype.getRollsList   = function() {
  return [0, 0]
}
