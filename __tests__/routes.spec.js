const indexRoute = require('../routes/index');
const matchesRoute = require('../routes/matches');
const stadiumsRoute = require('../routes/stadiums');
const teamsRoute = require('../routes/teams');
const usersRoute = require('../routes/users');

describe('Routing Network Tests', () => {
  it('should have the main index router defined', () => {
    expect(indexRoute).toBeDefined();
  });
  it('should have the matches router defined', () => {
    expect(matchesRoute).toBeDefined();
  });
  it('should have the stadiums router defined', () => {
    expect(stadiumsRoute).toBeDefined();
  });
  it('should have the teams router defined', () => {
    expect(teamsRoute).toBeDefined();
  });
  it('should have the users router defined', () => {
    expect(usersRoute).toBeDefined();
  });
});