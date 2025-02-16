const pool = require('../config/db');

module.exports = {
  getAllHotels: async () => {
    const [rows] = await pool.query('SELECT * FROM hotels');
    return rows;
  },
  addHotel: async (hotel) => {
    const { name, location, capacity } = hotel;
    const [result] = await pool.query(
      'INSERT INTO hotels (name, location, capacity) VALUES (?, ?, ?)',
      [name, location, capacity]
    );
    return { id: result.insertId, ...hotel };
  },
  getHotelById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM hotels WHERE id = ?', [id]);
    return rows[0];
  },
  updateHotel: async (id, updatedHotel) => {
    const { name, location, capacity } = updatedHotel;
    await pool.query(
      'UPDATE hotels SET name = ?, location = ?, capacity = ? WHERE id = ?',
      [name, location, capacity, id]
    );
    return { id, ...updatedHotel };
  },
  deleteHotel: async (id) => {
    await pool.query('DELETE FROM hotels WHERE id = ?', [id]);
    return true;
  }
};