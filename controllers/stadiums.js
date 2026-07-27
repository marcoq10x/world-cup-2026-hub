const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllStadiums = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('stadiums').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleStadium = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const stadiumId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('stadiums').find({ _id: stadiumId });
    const lists = await result.toArray();
    if (lists.length === 0) return res.status(404).json({ message: 'Stadium not found' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStadium = async (req, res) => {
  try {
    const stadium = {
      name: req.body.name,
      city: req.body.city,
      capacity: req.body.capacity
    };
    const response = await mongodb.getDb().db().collection('stadiums').insertOne(stadium);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error creating stadium.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStadium = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const stadiumId = new ObjectId(req.params.id);
    const stadium = {
      name: req.body.name,
      city: req.body.city,
      capacity: req.body.capacity
    };
    const response = await mongodb.getDb().db().collection('stadiums').replaceOne({ _id: stadiumId }, stadium);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Stadium not found or no changes made.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStadium = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const stadiumId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('stadiums').deleteOne({ _id: stadiumId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Stadium not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllStadiums, getSingleStadium, createStadium, updateStadium, deleteStadium };