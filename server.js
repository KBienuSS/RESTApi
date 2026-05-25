const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const socket = require('socket.io');

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

async function startServer() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/NewWaveDB');
    console.log('Successfully connected to the database');

    const app = express();

    app.use(cors());
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.use(express.json());

    const server = app.listen(8000, () => {
      console.log('Server is running on port: 8000');
    });

    const io = socket(server);

    app.use((req, res, next) => {
      req.io = io;
      next();
    });

    app.use('/api', testimonialsRoutes);
    app.use('/api', concertsRoutes);
    app.use('/api', seatsRoutes);

    io.on('connection', (sock) =>{
      console.log("New Socket!");
      sock.emit('seatsUpdated', db.seats);
    });

    app.get('/*splat', (req, res) => {
      res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });

    app.use((req, res) => {
      res.status(404).json({ message: 'Not found...' });
    });

  } catch (err) {
    console.log('Błąd połączenia:', err);
  }
}

startServer();