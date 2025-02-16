let reservations = [];
let reservationIdCounter = 1;

module.exports = {
  getAllReservations: () => reservations,
  addReservation: (reservation) => {
    reservation.id = reservationIdCounter++;
    reservations.push(reservation);
    return reservation;
  },
  getReservationById: (id) => reservations.find(reservation => reservation.id === id),
  deleteReservation: (id) => {
    const index = reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      reservations.splice(index, 1);
      return true;
    }
    return false;
  }
};