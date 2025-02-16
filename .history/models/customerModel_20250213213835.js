const pool = require('../config/db');

module.exports = {
  getAllCustomers: async () => {
    const [rows] = await pool.query('SELECT * FROM customers');
    return rows;
  },
  addCustomer: async (customer) => {
    const { name, email, phone } = customer;
    const [result] = await pool.query(
      'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)',
      [name, email, phone]
    );
    return { id: result.insertId, ...customer };
  },
  getCustomerById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [id]);
    return rows[0];
  },
  updateCustomer: async (id, updatedCustomer) => {
    const { name, email, phone } = updatedCustomer;
    await pool.query(
      'UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, id]
    );
    return { id, ...updatedCustomer };
  },
  deleteCustomer: async (id) => {
    await pool.query('DELETE FROM customers WHERE id = ?', [id]);
    return true;
  }
};