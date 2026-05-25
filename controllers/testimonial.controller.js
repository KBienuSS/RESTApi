const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const [testimonial] = await Testimonial.aggregate([{ $sample: { size: 1 } }]);
    if(!testimonial) res.status(404).json({ error: 'No testimonials available' });
    else res.json(testimonial);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if(!testimonial) res.status(404).json({ error: 'Testimonial not found' });
    else res.json(testimonial);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  const { author, text } = req.body;
  if(!author || !text) {
    return res.status(400).json({ error: 'Missing author or text' });
  }
  try {
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { author, text } = req.body;
  if(!author || !text) {
    return res.status(400).json({ error: 'Missing author or text' });
  }
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { author, text },
      { new: true }
    );
    if(!updated) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(updated);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.remove = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if(!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};