const express = require('express');
const seatsRouter = express.Router();
const db = require('../db/db.js');

seatsRouter.get('/seats', (req, res) => {
  res.json(db.seats);
});

seatsRouter.get('/seats/:id', (req, res) => {
  const seat = db.seats.find(item => item.id == req.params.id);
  if (seat) {
    res.json(seat);
  } else {
    res.status(404).json({ error: 'Seat not found' });
  }
});

seatsRouter.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;
  if (!day || !seat || !client || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newSeat = { id: uuidv4(), day, seat, client, email };
  db.seats.push(newSeat);
  res.status(201).json(newSeat);
});

seatsRouter.put('/seats/:id', (req, res) => {
  const { day, seat, client, email } = req.body;
  if (!day || !seat || !client || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const idx = db.seats.findIndex(item => item.id == req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Seat not found' });
  }
  db.seats[idx] = { id: db.seats[idx].id, day, seat, client, email };
  res.json(db.seats[idx]);
});

seatsRouter.delete('/seats/:id', (req, res) => {
  const idx = db.seats.findIndex(item => item.id == req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Seat not found' });
  }
  db.seats.splice(idx, 1);
  res.json({ message: 'OK' });
});

module.exports = seatsRouter;