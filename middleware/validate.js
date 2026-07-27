const Joi = require('joi');

const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

const matchSchema = Joi.object({
  matchup: Joi.string().required(),
  date: Joi.string().required(),
  hostCity: Joi.string().required(),
  homeTeam: Joi.string().required(),
  awayTeam: Joi.string().required(),
  predictedScore: Joi.string().required(),
  status: Joi.string().required()
});

const stadiumSchema = Joi.object({
  name: Joi.string().required(),
  city: Joi.string().required(),
  capacity: Joi.number().required()
});

const teamSchema = Joi.object({
  country: Joi.string().required(),
  coach: Joi.string().required(),
  fifaRanking: Joi.number().required()
});

const userSchema = Joi.object({
  username: Joi.string().required(),
  githubId: Joi.string().required(),
  displayName: Joi.string().required(),
  profileUrl: Joi.string().required()
});

module.exports = {
  validateMatch: validator(matchSchema),
  validateStadium: validator(stadiumSchema),
  validateTeam: validator(teamSchema),
  validateUser: validator(userSchema)
};