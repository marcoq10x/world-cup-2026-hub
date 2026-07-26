const mongodb = require('../db/database');

const getAllMatches = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('matches').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error occurred while retrieving matches.' });
  }
};

module.exports = { getAllMatches };