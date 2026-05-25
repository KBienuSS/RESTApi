const express = require('express');
const testimonialsRouter = express.Router();
const TestimonialController = require('../controllers/testimonial.controller');

testimonialsRouter.get('/testimonials', TestimonialController.getAll);
testimonialsRouter.get('/testimonials/random', TestimonialController.getRandom);
testimonialsRouter.get('/testimonials/:id', TestimonialController.getById);
testimonialsRouter.post('/testimonials', TestimonialController.create);
testimonialsRouter.put('/testimonials/:id', TestimonialController.update);
testimonialsRouter.delete('/testimonials/:id', TestimonialController.remove);

module.exports = testimonialsRouter;