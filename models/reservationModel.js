const pool = require('../config/db');

module.exports = {
  getAllReservations: async () => {
    const [rows] = await pool.query('SELECT * FROM reservations');
    return rows;
  },
  addReservation: async (reservation) => {
    const { hotelId, customerId, checkInDate, checkOutDate } = reservation;
    const [result] = await pool.query(
      'INSERT INTO reservations (hotel_id, customer_id, check_in_date, check_out_date) VALUES (?, ?, ?, ?)',
      [hotelId, customerId, checkInDate, checkOutDate]
    );
    return { id: result.insertId, ...reservation };
  },
  getReservationById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM reservations WHERE id = ?', [id]);
    return rows[0];
  },
  deleteReservation: async (id) => {
    await pool.query('DELETE FROM reservations WHERE id = ?', [id]);
    return true;
  }
};