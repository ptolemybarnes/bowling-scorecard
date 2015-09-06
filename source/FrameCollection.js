function FrameCollection(frames) {
  this.frames = frames || [];
}

FrameCollection.prototype.getFrame = function(index) {
  if (!this.frames[index]) { return new NullFrame() };
  return this.frames[index];
}

FrameCollection.prototype.push = function(frame) {
  this.frames.push(frame);
}

FrameCollection.prototype.reduce = function(callback) {
  return [0].concat(this.frames).reduce(callback);
}

