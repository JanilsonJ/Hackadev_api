const express = require("express");

const customerService = require("../service/customerService.js");

const customers = express.Router();

customers.get('/customer', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const result = await customerService.getCustomers();
    res.send(result)
})

customers.get('/customer_address/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    const result = await customerService.getAddressByCustomerID(id);
    res.send(result)
})

customers.get('/customer_delivery_address/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    const result = await customerService.getDeliveryAddressByCustomerID(id);
    res.send(result)
})

customers.get('/customer_cards/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    const result = await customerService.getCardByCustomerID(id);
    res.send(result)
})

customers.get('/customer/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;
    const result = await customerService.getCustomerById(id);

    return res.status(200).send(result)    
})

customers.get('/customer_cpf/:cpf', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { cpf } = req.params;
    const result = await customerService.getCustomerByCPF(cpf);

    return res.status(200).send(result)    
})

customers.get('/customer_email/:email', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { email } = req.params;
    const result = await customerService.getCustomerByEmail(email);

    return res.status(200).send(result)    
})

customers.post('/customer_validate', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    const result = await customerService.validateLogin(data);

    return res.status(200).send(result);   
})

customers.post('/customer', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        await customerService.insertCustomer(data);
        return res.status(200).send(true)
    } catch (error) {
        return res.status(400).send(false)
    }
})

customers.post('/customer_address', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    await customerService.insertCustomerAddress(data);
    return res.status(200).send(`Endereço ${data.name} inserido com sucesso!`)
})

customers.post('/customer_card', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    await customerService.insertCustomerCard(data);
    return res.status(200).send(`Cliente ${data.name} inserido com sucesso!`)
})

customers.put('/customer/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;
    const data = req.body

    const result = await customerService.updateCustomerById(id, data);
    return res.status(200).send(result)
})

customers.put('/customer_delivery_address', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    await customerService.updateDeliveryAddress(data);
    return res.status(200).send(true);
})

customers.put('/customer_payment_card', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    await customerService.updatePaymentCard(data);
    return res.status(200).send(true);
})

customers.delete('/customer/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    const result = await customerService.deleteCustomerById(id);
    return res.status(200).send(result)
})

customers.delete('/customer_address/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    const result = await customerService.deleteAddressById(id);
    return res.status(200).send(result)
})

customers.delete('/customer_card/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    const result = await customerService.deleteCardById(id);
    return res.status(200).send(result)
})
    
module.exports = customers;