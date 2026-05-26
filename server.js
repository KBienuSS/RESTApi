const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const helmet = require('helmet');

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');
const Seat = require('./models/seat.model.js'); // <-- dodany import

async function startServer() {
  try {
    const dbURI = process.env.NODE_ENV === 'production'
      ? `mongodb+srv://tester:${process.env.DB_PASS}@cluster0.tvjci.mongodb.net/BulletinBoard?retryWrites=true&w=majority`
      : 'mongodb://localhost:27017/bulletinBoard';

    await mongoose.connect(dbURI);
    console.log('Successfully connected to the database');

    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '/client/build')));

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

    io.on('connection', async (sock) => {
      console.log('New Socket!');
      const seats = await Seat.find();
      sock.emit('seatsUpdated', seats);
    });

    app.get('/*splat', (req, res) => {
      res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });

  } catch (err) {
    console.log('Błąd połączenia:', err);
  }
}

startServer();