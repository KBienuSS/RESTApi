const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if(!concert) res.status(404).json({ error: 'Concert not found' });
    else res.json(concert);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if(!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.status(201).json(newConcert);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if(!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const updated = await Concert.findByIdAndUpdate(
      req.params.id,
      { performer, genre, price, day, image },
      { new: true }
    );
    if(!updated) return res.status(404).json({ error: 'Concert not found' });
    res.json(updated);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.remove = async (req, res) => {
  try {
    const concert = await Concert.findByIdAndDelete(req.params.id);
    if(!concert) return res.status(404).json({ error: 'Concert not found' });
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};