const express = require('express');
const testimonialsRouter = express.Router();
const db = require('../db/db.js');
const { v4: uuidv4 } = require('uuid');

testimonialsRouter.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

testimonialsRouter.get('/testimonials/random', (req, res) => {
  if (db.testimonials.length === 0) {
    return res.status(404).json({ error: 'No testimonials available' });
  }
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

testimonialsRouter.get('/testimonials/:id', (req, res) => {
  const testimonial = db.testimonials.find(item => item.id == req.params.id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ error: 'Testimonial not found' });
  }
});

testimonialsRouter.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: 'Missing author or text' });
  }
  const newTestimonial = { id: uuidv4(), author, text };
  db.testimonials.push(newTestimonial);
  res.status(201).json(newTestimonial);
});

testimonialsRouter.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: 'Missing author or text' });
  }
  const idx = db.testimonials.findIndex(item => item.id == req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Testimonial not found' });
  }
  db.testimonials[idx] = { id: db.testimonials[idx].id, author, text };
  res.json(db.testimonials[idx]);
});

testimonialsRouter.delete('/testimonials/:id', (req, res) => {
  const idx = db.testimonials.findIndex(item => item.id == req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Testimonial not found' });
  }
  db.testimonials.splice(idx, 1);
  res.json({ message: 'OK' });
});

module.exports = testimonialsRouter;