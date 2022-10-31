const accountSid = 'AC10d24d55bd707473faf37459fda8904b'; 
const authToken = 'f983f35539f1a4783a5a5ab254dee764'; 
const client = require('twilio')(accountSid, authToken); 

function twoDigits (value) {
    return value.toLocaleString('pt-BR', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
}

function sendPurchaseMessage(user, order, orderId, order_date) {
    const date = new Date(order_date.toString().slice('.'));

    const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    const body = `
Olá, *${user.name}*!

O pagamento do seu pedido acabou de ser aprovado ✅. 

_*Confira mais detalhes de seu pedidio:*_
    📦 *Pedido:* Nº ${orderId}

    😄 *Destinatário:* ${order.addressee}

    📌 *Local de entrega:* ${order.order_address}

    💵 *Valor:* R$${order.total_price.toFixed(2)}

    ❎ *Parcelas:* ${order.installments}

    📅 *Data:* ${twoDigits(date.getDate())} de ${monthNames[date.getMonth()]} de ${date.getFullYear()} às ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}

----------------------------------------
Atenciosamente *IMPÉRIO DA MODA AMERICANA*.`

    try {
        client.messages 
        .create({ 
            body: body, 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:+556281068866' 
        }) 
        .then(message => console.log(message.sid)) 
        .done();
    } catch (error) {
        console.log(`Erro ao tentar enviar a notificação pelo framework da Twilio. Error: ${error}`)
    }
}

module.exports = { sendPurchaseMessage };