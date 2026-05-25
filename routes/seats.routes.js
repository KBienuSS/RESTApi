const express = require('express');
const seatsRouter = express.Router();
const SeatController = require('../controllers/seat.controller');

seatsRouter.get('/seats', SeatController.getAll);
seatsRouter.get('/seats/:id', SeatController.getById);
seatsRouter.post('/seats', SeatController.create);
seatsRouter.put('/seats/:id', SeatController.update);
seatsRouter.delete('/seats/:id', SeatController.remove);

module.exports = seatsRouter;