const reservationModel = require('../models/reservationModel');

module.exports = {
  getAllReservations: (req, res) => {
    res.json(reservationModel.getAllReservations());
  },
  addReservation: (req, res) => {
    const newReservation = reservationModel.addReservation(req.body);
    res.status(201).json(newReservation);
  },
  getReservationById: (req, res) => {
    const reservation = reservationModel.getReservationById(parseInt(req.params.id));
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  },
  deleteReservation: (req, res) => {
    const isDeleted = reservationModel.deleteReservation(parseInt(req.params.id));
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  }
};