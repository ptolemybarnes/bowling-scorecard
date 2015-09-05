describe("Null Frame", function() {
  var nullFrame;
  
  beforeEach(function() {
    nullFrame = new NullFrame();
  })

  it('reports a score of zero', function() { 
    expect(nullFrame.calculateScore()).toEqual(0)
  });

});
