const express = require('express');
const bodyParser = require('body-parser');
const hotelRoutes = require('./routes/hotelRoutes');
const customerRoutes = require('./routes/customerRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/hotels', hotelRoutes);
app.use('/customers', customerRoutes);
app.use('/reservations', reservationRoutes);

module.exports = app;