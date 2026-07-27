const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTeams = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('teams').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleTeam = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const teamId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('teams').find({ _id: teamId });
    const lists = await result.toArray();
    if (lists.length === 0) return res.status(404).json({ message: 'Team not found' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const team = {
      country: req.body.country,
      coach: req.body.coach,
      fifaRanking: req.body.fifaRanking
    };
    const response = await mongodb.getDb().db().collection('teams').insertOne(team);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error creating team.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const teamId = new ObjectId(req.params.id);
    const team = {
      country: req.body.country,
      coach: req.body.coach,
      fifaRanking: req.body.fifaRanking
    };
    const response = await mongodb.getDb().db().collection('teams').replaceOne({ _id: teamId }, team);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Team not found or no changes made.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const teamId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('teams').deleteOne({ _id: teamId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Team not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllTeams, getSingleTeam, createTeam, updateTeam, deleteTeam };