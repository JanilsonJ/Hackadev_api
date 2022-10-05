const customerData = require("../data/customerData.js");

const getCustomers = () => {
    return customerData.getCustomers();
}

const getCustomerById = (id) => {
    return customerData.getCustomerById(id);
}

const getAddressByCustomerID = (id) => {
    return customerData.getAddressByCustomerID(id);
}

const getDeliveryAddressByCustomerID = (id) => {
    return customerData.getDeliveryAddressByCustomerID(id);
}

const getCardByCustomerID = (id) => {
    return customerData.getCardByCustomerID(id);
}

const getCustomerByCPF = (cpf) => {
    return customerData.getCustomerByCPF(cpf);
}

const getCustomerByEmail = (email) => {
    return customerData.getCustomerByEmail(email);
}

const validateLogin = async (data) => {
    const customer = await customerData.validateLogin(data);
    return customer !== null ? customer : false;
}

const insertCustomer = async (data) => {
    return await customerData.insertCustomer(data);
}

const insertCustomerAddress = (data) => {
    return customerData.insertCustomerAddress(data);
}

const insertCustomerCard = (data) => {
    return customerData.insertCustomerCard(data);
}

const updateCustomerById = (id, data) => {
    return customerData.updateCustomerById(id, data);
}

const updateDeliveryAddress = async (data) => {
    
    return await customerData.updateDeliveryAddress(data);
}

const updatePaymentCard = async (data) => {
    
    return await customerData.updatePaymentCard(data);
}

const deleteCustomerById = (id) => {
    return customerData.deleteCustomerById(id);
}

const deleteAddressById = async (id) => {
    return await customerData.deleteAddressById(id);
}

const deleteCardById = async (id) => {
    return await customerData.deleteCardById(id);
}

const customerService = {
    getCustomers,
    getCustomerById,
    getAddressByCustomerID,
    getDeliveryAddressByCustomerID,
    getCardByCustomerID,
    getCustomerByCPF,
    getCustomerByEmail,
    validateLogin,
    insertCustomer,
    insertCustomerAddress,
    insertCustomerCard,
    updateCustomerById,
    updateDeliveryAddress,
    updatePaymentCard,
    deleteCustomerById,
    deleteAddressById,
    deleteCardById
};

module.exports = customerService;