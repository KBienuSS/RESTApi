const express = require('express');
const concertsRouter = express.Router();
const ConcertController = require('../controllers/concerts.controller');

concertsRouter.get('/concerts', ConcertController.getAll);
concertsRouter.get('/concerts/:id', ConcertController.getById);
concertsRouter.post('/concerts', ConcertController.create);
concertsRouter.put('/concerts/:id', ConcertController.update);
concertsRouter.delete('/concerts/:id', ConcertController.remove);

module.exports = concertsRouter;