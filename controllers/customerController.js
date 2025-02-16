const customerModel = require('../models/customerModel');

module.exports = {
  getAllCustomers: (req, res) => {
    res.json(customerModel.getAllCustomers());
  },
  addCustomer: (req, res) => {
    const newCustomer = customerModel.addCustomer(req.body);
    res.status(201).json(newCustomer);
  },
  getCustomerById: (req, res) => {
    const customer = customerModel.getCustomerById(parseInt(req.params.id));
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  },
  updateCustomer: (req, res) => {
    const updatedCustomer = customerModel.updateCustomer(parseInt(req.params.id), req.body);
    if (updatedCustomer) {
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  },
  deleteCustomer: (req, res) => {
    const isDeleted = customerModel.deleteCustomer(parseInt(req.params.id));
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  }
};