const db = require("../infra/conection.js");

const getOrders = () => {
    return db.query(`SELECT * FROM order_details AS od LEFT JOIN order_items AS oi ON oi.order_details_id = od.id `);
}

const getOrderById = async (id) => {	
    return db.query(`SELECT * FROM order_details WHERE id = '${id}'`);
}

const getOrderByUserId = (id) => {
    return db.query(`
        SELECT order_details_id, order_items_id, addressee, order_date, total_price, installments, order_address, name, size, order_items_quantity, order_items_price, image1
        FROM order_details
        INNER JOIN order_items ON order_items.order_details_id = order_details.id
        INNER JOIN product_attributes ON product_attributes.sku = order_items.product_sku
        INNER JOIN product ON product.id = product_attributes.product_id
        WHERE customer_id = ${id} 
        ORDER BY order_details_id DESC;
    `);
}

const getOrderItemsByDetailsId = (id) => {
    return db.query(`
        SELECT * FROM order_items
        INNER JOIN product ON order_items.product_id = product.id
        WHERE order_id = '${id}'
    `);
}

const insertOrderDetails = async (customer_id, addressee, total_price, installments, order_address) => {
    return await db.oneOrNone(`
        INSERT INTO order_details VALUES (DEFAULT, ${Number(customer_id)}, '${addressee}', NOW(), ${Number(total_price)}, ${Number(installments)}, '${order_address}')
        RETURNING id, order_date;
    `);
}

const insertOrderItems = async (order_id, product_sku, order_item_quantity, order_item_price) => {
    return await db.query(`
        INSERT INTO order_items VALUES (DEFAULT, ${order_id}, '${product_sku}', ${Number(order_item_quantity)}, ${Number(order_item_price)});
    `);
}

const orderData = {
    getOrders,
    getOrderById,
    getOrderByUserId,
    getOrderItemsByDetailsId,
    insertOrderDetails,
    insertOrderItems
}

module.exports = orderData;