var FrameCollection = (function() {
  
  function FrameCollection(frames) {
    this.frames    = frames || [];
    this.maxFrames = 10;
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

  FrameCollection.prototype.getLastFrame = function() {
    return this.getFrame(this.frames.length - 1);
  }

  FrameCollection.prototype.countFrames = function() {
    return this.frames.length;
  }

  return FrameCollection;
})();

