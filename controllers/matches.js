const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllMatches = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('matches').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleMatch = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const matchId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('matches').find({ _id: matchId });
    const lists = await result.toArray();
    if (lists.length === 0) return res.status(404).json({ message: 'Match not found' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMatch = async (req, res) => {
  try {
    const match = {
      matchup: req.body.matchup,
      date: req.body.date,
      hostCity: req.body.hostCity,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      predictedScore: req.body.predictedScore,
      status: req.body.status
    };
    const response = await mongodb.getDb().db().collection('matches').insertOne(match);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error creating match.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMatch = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const matchId = new ObjectId(req.params.id);
    const match = {
      matchup: req.body.matchup,
      date: req.body.date,
      hostCity: req.body.hostCity,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      predictedScore: req.body.predictedScore,
      status: req.body.status
    };
    const response = await mongodb.getDb().db().collection('matches').replaceOne({ _id: matchId }, match);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Match not found or no changes made.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMatch = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const matchId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('matches').deleteOne({ _id: matchId });
    if (response.deletedCount > 0) {
      res.status(200).send(); // 200 to strictly match the rubric
    } else {
      res.status(404).json({ message: 'Match not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllMatches, getSingleMatch, createMatch, updateMatch, deleteMatch };