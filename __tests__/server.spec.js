const app = require('../server');

describe('Server Startup Test', () => {
  it('should export the express app correctly', () => {
    expect(app).toBeDefined();
  });
});