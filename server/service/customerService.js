const customerData = require("../data/customerData.js");

function isEmpyt (obj) {
    const objStringfy = JSON.stringify(obj)

    return objStringfy === '[]' || objStringfy === 'null';
}

const getCustomers = async () => {
    return await customerData.getCustomers();
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

const authCustomer = async (data) => {
    const { email, password } = data

    if (email === undefined || password === undefined)
        throw new Error('Dados insuficientes para validação do login');

    const customer = await customerData.authCustomer(email, password);

    if (isEmpyt(customer))
        throw new Error('Autenticação invalida!');

    return customer;
}

const insertCustomer = async (data) => {
    const { name, cpf, birth, email, password, tel, adm } = data;

    if (name === undefined || cpf === undefined || birth === undefined || 
        email === undefined || password === undefined || tel === undefined)
        throw new Error('Dados insuficientes para a criação do usuário');
    
    const emailExists = await customerData.verifyIfCustomerDataAlreadyExitsts('email', email);
    if (emailExists !== null)
        throw 'Email já cadastrado no sistema!';
    
    const cpfExists = await customerData.verifyIfCustomerDataAlreadyExitsts('cpf', cpf);
    if (cpfExists !== null)
        throw 'CPF já cadastrado no sistema!';

    return await customerData.insertCustomer(name, cpf, birth, email, password, tel, adm);
}

const insertCustomerAddress = async (data) => {
    const { customer_id, addressee, cep, address, complement, district, city, state, principal_address } = data;

    if (customer_id === undefined || addressee === undefined || cep === undefined || 
        address === undefined || complement === undefined || district === undefined || 
        city === undefined || state === undefined || principal_address === undefined)
        throw new Error('Dados insuficientes para a adição do endereço.');

    if (principal_address)
        customerData.setAllDeliveryAddressFalse(customer_id)

    return customerData.insertCustomerAddress(customer_id, addressee, cep, address, complement, district, city, state, principal_address);
}

const insertCustomerCard = async (data) => {
    const { customer_id, card_number, card_name, expiry, cvv, payment_card } = data;

    if (customer_id === undefined || card_number === undefined || card_name === undefined || 
        expiry === undefined || cvv === undefined || payment_card === undefined)
        throw new Error('Dados insuficientes para a adição do cartão.');

    if (payment_card)
        customerData.setAllPaymentCardsFalse(customer_id)

    return await customerData.insertCustomerCard(customer_id, card_number, card_name, expiry, cvv, payment_card);
}

const updateCustomerById = async (data) => {
    const { id, name, cpf, birth, email,  password, tel, adm } = data;

    if (name === undefined || cpf === undefined || birth === undefined || email === undefined || 
        password === undefined || tel === undefined || adm === undefined)
        throw new Error('Dados insuficientes para atualizar informações do usuário.');

    const emailExists = await customerData.verifyIfCustomerDataAlreadyExitsts('email', email);
    const { email: actualEmail } = await customerData.getCustomerById(id);
    if (emailExists !== null && actualEmail !== email)
        throw 'Email já cadastrado no sistema!';

    return await customerData.updateCustomerById(id, name, birth, email, password, tel, adm);
}

const updateDeliveryAddress = async (data) => {
    const { address_id, customer_id } = data; 

    if (address_id === undefined || customer_id === undefined)
        throw new Error('Dados insuficientes para atualizar endereço de entrega.');

    return await customerData.updateDeliveryAddress(address_id, customer_id);
}

const updatePaymentCard = async (data) => {
    const { card_id, customer_id } = data; 

    if (card_id === undefined || customer_id === undefined)
        throw new Error('Dados insuficientes para atualizar cartão para pagamento.');

    return await customerData.updatePaymentCard(card_id, customer_id);
}

const deleteAddressById = async (id) => {
    if (id === undefined)
        throw new Error('Id para exlusão do endereço não informado!');

    return await customerData.deleteAddressById(id);
}

const deleteCardById = async (id) => {
    if (id === undefined)
        throw new Error('Id para exlusão do cartão não informado!');

    return await customerData.deleteCardById(id);
}

const customerService = {
    getCustomers,
    getCustomerById,
    getAddressByCustomerID,
    getDeliveryAddressByCustomerID,
    getCardByCustomerID,
    authCustomer,
    insertCustomer,
    insertCustomerAddress,
    insertCustomerCard,
    updateCustomerById,
    updateDeliveryAddress,
    updatePaymentCard,
    deleteAddressById,
    deleteCardById
};

module.exports = customerService;