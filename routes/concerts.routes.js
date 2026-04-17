const express = require('express');
const concertsRouter = express.Router();
const db = require('../db/db.js');

concertsRouter.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

concertsRouter.get('/concerts/:id', (req, res) => {
  const concert = db.concerts.find(item => item.id == req.params.id);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({ error: 'Concert not found' });
  }
});

concertsRouter.post('/concerts', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newConcert = { id: uuidv4(), performer, genre, price, day, image };
  db.concerts.push(newConcert);
  res.status(201).json(newConcert);
});

concertsRouter.put('/concerts/:id', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const idx = db.concerts.findIndex(item => item.id == req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Concert not found' });
  }
  db.concerts[idx] = { id: db.concerts[idx].id, performer, genre, price, day, image };
  res.json(db.concerts[idx]);
});

concertsRouter.delete('/concerts/:id', (req, res) => {
  const idx = db.concerts.findIndex(item => item.id == req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Concert not found' });
  }
  db.concerts.splice(idx, 1);
  res.json({ message: 'OK' });
});

module.exports = concertsRouter;