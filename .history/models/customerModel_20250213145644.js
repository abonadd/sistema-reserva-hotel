let customers = [];
let customerIdCounter = 1;

module.exports = {
  getAllCustomers: () => customers,
  addCustomer: (customer) => {
    customer.id = customerIdCounter++;
    customers.push(customer);
    return customer;
  },
  getCustomerById: (id) => customers.find(customer => customer.id === id),
  updateCustomer: (id, updatedCustomer) => {
    const index = customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
      customers[index] = { ...customers[index], ...updatedCustomer };
      return customers[index];
    }
    return null;
  },
  deleteCustomer: (id) => {
    const index = customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
      customers.splice(index, 1);
      return true;
    }
    return false;
  }
};