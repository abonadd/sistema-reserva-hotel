let hotels = [];
let hotelIdCounter = 1;

module.exports = {
  getAllHotels: () => hotels,
  addHotel: (hotel) => {
    hotel.id = hotelIdCounter++;
    hotels.push(hotel);
    return hotel;
  },
  getHotelById: (id) => hotels.find(hotel => hotel.id === id),
  updateHotel: (id, updatedHotel) => {
    const index = hotels.findIndex(hotel => hotel.id === id);
    if (index !== -1) {
      hotels[index] = { ...hotels[index], ...updatedHotel };
      return hotels[index];
    }
    return null;
  },
  deleteHotel: (id) => {
    const index = hotels.findIndex(hotel => hotel.id === id);
    if (index !== -1) {
      hotels.splice(index, 1);
      return true;
    }
    return false;
  }
};