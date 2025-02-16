const hotelModel = require('../models/hotelModel');

module.exports = {
  getAllHotels: (req, res) => {
    res.json(hotelModel.getAllHotels());
  },
  addHotel: (req, res) => {
    const newHotel = hotelModel.addHotel(req.body);
    res.status(201).json(newHotel);
  },
  getHotelById: (req, res) => {
    const hotel = hotelModel.getHotelById(parseInt(req.params.id));
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  },
  updateHotel: (req, res) => {
    const updatedHotel = hotelModel.updateHotel(parseInt(req.params.id), req.body);
    if (updatedHotel) {
      res.json(updatedHotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  },
  deleteHotel: (req, res) => {
    const isDeleted = hotelModel.deleteHotel(parseInt(req.params.id));
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  }
};