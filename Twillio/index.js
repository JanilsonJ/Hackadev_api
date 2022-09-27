const accountSid = 'AC10d24d55bd707473faf37459fda8904b'; 
const authToken = '4d7ec26f9cc5e94451a143a2b9d0a0cb'; 
const client = require('twilio')(accountSid, authToken); 

function sendPurchaseMessage(user, order) {
    const body = `
Olá, *${user.name}*!

O pagamento do seu pedido acabou de ser aprovado ✅. 

Confira mais detalhes de seu pedidio: 
📦 *Pedido:* Nº ${order.id}
📌 *Local de entrega:* ${order.order_address}
💵 *Valor:* R$${order.total_price}
📅 *Data:* ${order.order_date}

Atenciosamente *IMPÉRIO DA MODA AMERICANA* 🦁.`

    client.messages 
    .create({ 
        body: body, 
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:+556281068866' 
    }) 
    .then(message => console.log(message.sid)) 
    .done();
}

module.exports = { sendPurchaseMessage };