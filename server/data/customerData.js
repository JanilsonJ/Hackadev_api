const db = require("../infra/conection.js");

const customerExists = async (id) => {
    const customer = await db.query(`SELECT * FROM customer WHERE id = ${id}`);

    return customer.length === 0
}

const getCustomers = () => {
    return db.query(`SELECT * FROM customer`);
}

const getCustomerById = async (id) => {
    if ( await customerExists(id))  
        return `Cliente(${id}) não encontrado.` 

    return db.one(`SELECT * FROM customer WHERE id = ${id}`);
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

const getCustomerByCPF = async (cpf) => { 
    return db.oneOrNone(`SELECT * FROM customer WHERE cpf = '${cpf}'`);
}

const getCustomerByEmail = async (email) => { 
    return db.oneOrNone(`SELECT * FROM customer WHERE email = '${email}'`);
}

const validateLogin = async (data) => {
    const { email, password } = data;

    const customer = await db.oneOrNone(`SELECT * FROM customer WHERE email = '${email}' AND password = '${password}'`);

    return customer;
}

const insertCustomer = (data) => {
    const { name, cpf, birth, email, password, tel, adm } = data;
    
    return db.query(`INSERT INTO customer VALUES (DEFAULT, '${name}', '${cpf}', TO_DATE('${birth}', 'YYYY/MM/DD'), '${email}', '${password}', '${tel}', false); `);
}

const insertCustomerAddress = async (data) => {
    const { customer_id, addressee, cep, address, complement, district, city, state, principal_address } = data;

    if (principal_address)
        await db.query(`
            UPDATE customer_address SET principal_address = false WHERE customer_id = ${customer_id};
        `)

    return await db.query(`INSERT INTO customer_address VALUES (DEFAULT, ${customer_id}, '${addressee}', '${cep}', '${address}', '${complement}', '${district}', '${city}', '${state}', '${principal_address}'); `);
}

const insertCustomerCard = async (data) => {
    const { customer_id, card_number, card_name, expiry, cvv, payment_card } = data;

    if (payment_card)
        await db.query(`
            UPDATE customer_card SET payment_card = false WHERE customer_id = ${customer_id};
        `)

    return await db.query(`INSERT INTO customer_card VALUES (DEFAULT, '${customer_id}', '${card_number}', '${card_name}', TO_DATE('${expiry}', 'YYYY/MM'), '${cvv}', ${payment_card}); `);
}

const updateCustomerById = async (id, data) => {
    const { name, cpf, birth, email, password, tel, adm } = data;

    if (await customerExists(id))  
        return `Cliente(${id}) não encontrado.` 
    
    return db.query(`
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

const updateDeliveryAddress = async (data) => {
    const { address_id, customer_id } = data; 

    return await db.query(`
        UPDATE customer_address SET principal_address = false WHERE customer_id = ${customer_id};
        UPDATE customer_address SET principal_address = true WHERE customer_id = ${customer_id} AND address_id = ${address_id}
    `)
}

const updatePaymentCard = async (data) => {
    const { card_id, customer_id } = data; 

    return await db.query(`
        UPDATE customer_card SET payment_card = false WHERE customer_id = ${customer_id};
        UPDATE customer_card SET payment_card = true WHERE customer_id = ${customer_id} AND card_id = ${card_id}
    `)
}

const deleteCustomerById = async (id) => {    
    db.query(`DELETE FROM customer WHERE id = ${id}`)

    return `Cliente(${id}) excluído com sucesso!`
}

const deleteAddressById = async (id) => {
    return db.query(`DELETE FROM customer_address WHERE address_id = ${id}`)
}

const deleteCardById = async (id) => {
    return db.query(`DELETE FROM customer_card WHERE card_id = ${id}`)
}

const customerData = {
    getCustomers,
    getCustomerById,
    getAddressByCustomerID,
    getDeliveryAddressByCustomerID,
    getCardByCustomerID,
    getCustomerByCPF,
    getCustomerByEmail,
    insertCustomerAddress,
    insertCustomerCard,
    validateLogin,
    insertCustomer,
    updateCustomerById,
    updateDeliveryAddress,
    updatePaymentCard,
    deleteCustomerById,
    deleteAddressById,
    deleteCardById
}

module.exports = customerData;