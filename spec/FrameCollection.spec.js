describe("FrameCollection", function() {
  var frames;
  
  beforeEach(function() {
    frames = new FrameCollection()
  });

  it("behaves like an array", function() {
    frame = {};
    frames.push(frame);

    expect(frames.getFrame(0)).toEqual(frame);
  });

});
