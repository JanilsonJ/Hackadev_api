const db = require("../infra/conection.js");

const getCustomers = () => {
    return db.query(`SELECT * FROM customer`);
}

const getCustomerById = async (id) => {
    return db.oneOrNone(`SELECT * FROM customer WHERE id = ${id}`);
}

const getAddressByCustomerID = async (id) => { 
    return db.query(`SELECT * FROM customer_address WHERE customer_id = ${id} ORDER BY (principal_address is true) DESC`);
}

const getDeliveryAddressByCustomerID = async (id) => { 
    return db.oneOrNone(`SELECT * FROM customer_address WHERE customer_id = ${id} AND principal_address = true`);
}

const getCardByCustomerID = async (id) => {

    return db.query(`SELECT * FROM customer_card WHERE customer_id = ${id} ORDER BY (payment_Card is true) DESC`);
}

const authCustomer = async (email, password) => {
    return await db.oneOrNone(`SELECT * FROM customer WHERE email = '${email}' AND password = '${password}'`);
}

const insertCustomer = (name, cpf, birth, email, password, tel) => {
    return db.query(`
        INSERT INTO customer VALUES (DEFAULT, '${name}', '${cpf}', TO_DATE('${birth}', 'YYYY/MM/DD'), '${email}', '${password}', '${tel}', false);
    `);
}

const insertCustomerAddress = async (customer_id, addressee, cep, address, complement, district, city, state, principal_address) => {
    return await db.query(`
        INSERT INTO customer_address VALUES (DEFAULT, ${customer_id}, '${addressee}', '${cep}', '${address}', '${complement}', '${district}', '${city}', '${state}', '${principal_address}'); 
    `);
}

const setAllDeliveryAddressFalse = async (customer_id) => {
    return await db.query(`
        UPDATE customer_address SET principal_address = false WHERE customer_id = ${customer_id}; 
    `);
}

const insertCustomerCard = async (customer_id, card_number, card_name, expiry, cvv, payment_card) => {    
    return await db.query(`
        INSERT INTO customer_card VALUES (DEFAULT, '${customer_id}', '${card_number}', '${card_name}', TO_DATE('${expiry}', 'YYYY/MM'), '${cvv}', ${payment_card}); 
    `);
}

const setAllPaymentCardsFalse = async (customer_id) => {
    return await db.query(`
        UPDATE customer_card SET payment_card = false WHERE customer_id = ${customer_id};
    `);
}

const updateCustomerById = async (id, name, cpf, birth, email, password, tel, adm) => {
    return await db.query(`
        UPDATE customer SET 
            name = '${name}',
            cpf = '${cpf}',
            birth = TO_DATE('${birth}', 'YYYY/MM/DD'),
            email = '${email}',
            password = '${password}',
            tel = '${tel}',
            adm = '${adm}'
        WHERE id = ${id}`
    );
}

const updateDeliveryAddress = async (address_id, customer_id) => {
    return await db.query(`
        UPDATE customer_address SET principal_address = false WHERE customer_id = ${customer_id};
        UPDATE customer_address SET principal_address = true WHERE customer_id = ${customer_id} AND address_id = ${address_id}
    `)
}

const updatePaymentCard = async (card_id, customer_id) => {
    return await db.query(`
        UPDATE customer_card SET payment_card = false WHERE customer_id = ${customer_id};
        UPDATE customer_card SET payment_card = true WHERE customer_id = ${customer_id} AND card_id = ${card_id}
    `)
}

const deleteAddressById = async (id) => {
    return db.query(`DELETE FROM customer_address WHERE address_id = ${id}`)
}

const deleteCardById = async (id) => {
    return db.query(`DELETE FROM customer_card WHERE card_id = ${id}`)
}

const customerData = {
    insertCustomer,
    getCustomers,
    getCustomerById,
    updateCustomerById,
    
    authCustomer,    
    
    insertCustomerAddress,
    getAddressByCustomerID,
    getDeliveryAddressByCustomerID,
    updateDeliveryAddress,
    setAllDeliveryAddressFalse,
    deleteAddressById,
    
    insertCustomerCard,
    updatePaymentCard,
    getCardByCustomerID,
    setAllPaymentCardsFalse,
    deleteCardById
}

module.exports = customerData;