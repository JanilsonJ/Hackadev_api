const { sendPurchaseMessage } = require("../../Twillio/index.js");

const orderData = require("../data/orderData.js");
const customerData = require("../data/customerData.js");
const { Twilio } = require("twilio");

function isEmpyt (obj) {
    const objStringfy = JSON.stringify(obj)

    return objStringfy === '[]' || objStringfy === 'null';
}

const getOrders = async () => {
    return await orderData.getOrders();
}

const getOrderById = async (id) => {
    if (id === undefined)
        throw new Error('Id não definido!')

    return await orderData.getOrderById(id);
}

const getOrderByUserId = async (id) => {
    if (id === undefined)
        throw new Error('Id não definido!')

    const orders = await orderData.getOrderByUserId(id);

    return orders;
}

const getOrderItemsByDetailsId = (id) => {
    if (id === undefined)
        throw new Error('Id não definido!')

    return orderData.getOrderItemsByDetailsId(id);
}

const insertOrder = async (data) => {
    const { customer_id, addressee, total_price, installments, order_address } = data[0];

    if ( customer_id === undefined || addressee === undefined || total_price === undefined || 
        installments === undefined || order_address === undefined)
        throw new Error('Dados insuficientes para a criação do pedido!')
        
    const {id: orderId, order_date} = await orderData.insertOrderDetails(customer_id, addressee, total_price, installments, order_address);

    if (orderId === undefined || order_date === undefined)
        throw new Error('Erro ao cadastrar pedido!')

    //Cadastrando items na tabela referentes a orderId
    await data.slice(1, data.length).forEach(async i => {
        await orderData.insertOrderItems(orderId, i.product_sku, i.order_item_quantity, i.order_item_price);
    })

    //Notificando compra para o usuário.
    sendPurchaseMessage(await customerData.getCustomerById(customer_id), data[0], orderId, order_date);
}

const orderService = {
    getOrders,
    getOrderById,
    getOrderByUserId,
    getOrderItemsByDetailsId,
    insertOrder
};

module.exports = orderService;