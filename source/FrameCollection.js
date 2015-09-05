function FrameCollection() {
  this.frames = [];
}

FrameCollection.prototype.getFrame = function(index) {
  return this.frames[index];
}

FrameCollection.prototype.push = function(value) {
  this.frames.push(value);
}
