const indexRoute = require('../routes/index');
const matchesRoute = require('../routes/matches');

describe('Routing Network Tests', () => {
  it('should have the main index router defined', () => {
    expect(indexRoute).toBeDefined();
  });

  it('should have the matches router defined', () => {
    expect(matchesRoute).toBeDefined();
  });
});