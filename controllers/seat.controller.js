const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ error: 'Seat not found' });
    else res.json(seat);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  const { day, seat, client, email } = req.body;
  if(!day || !seat || !client || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const checkSeat = await Seat.findOne({ day, seat });
    if(checkSeat) {
      return res.status(409).json({ message: 'The slot is already taken...' });
    }
    const newSeat = new Seat({ day, seat, client, email });
    await newSeat.save();
    const allSeats = await Seat.find();
    req.io.emit('seatsUpdated', allSeats);
    res.status(201).json(newSeat);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { day, seat, client, email } = req.body;
  if(!day || !seat || !client || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const updated = await Seat.findByIdAndUpdate(
      req.params.id,
      { day, seat, client, email },
      { new: true }
    );
    if(!updated) return res.status(404).json({ error: 'Seat not found' });
    res.json(updated);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.remove = async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if(!seat) return res.status(404).json({ error: 'Seat not found' });
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};