const express = require("express");

const customerService = require("../service/customerService.js");

const customers = express.Router();

customers.get('/customer', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    try {
        const result = await customerService.getCustomers();
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.get('/customer/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;
    const result = await customerService.getCustomerById(id);

    try {
        return res.status(200).send(result)  
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.get('/customer/address/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    
    const { id } = req.params;

    try {
        const result = await customerService.getAddressByCustomerID(id);
        res.status(200).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.get('/customer/address/delivery/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    try {
        const result = await customerService.getDeliveryAddressByCustomerID(id);
        res.status(200).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.get('/customer/card/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    try {
        const result = await customerService.getCardByCustomerID(id);
        res.status(200).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.post('/customer/auth', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        const result = await customerService.authCustomer(data);
        res.status(200).send(result); 
    } catch (e) {
        res.status(406).send(e);
    }
})

customers.post('/customer', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        const customer = await customerService.insertCustomer(data);
        return res.status(200).send(customer);
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.post('/customer/address', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        await customerService.insertCustomerAddress(data);
        return res.status(201).send();
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.post('/customer/card', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        await customerService.insertCustomerCard(data);
        return res.status(201).send();
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.put('/customer', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        await customerService.updateCustomerById(data);
        return res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.put('/customer/address/delivery', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        await customerService.updateDeliveryAddress(data);
        return res.status(200).send(true);
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.put('/customer/card/payment', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        await customerService.updatePaymentCard(data);
        return res.status(200).send(true);
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.delete('/customer/address/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    try {
        const result = await customerService.deleteAddressById(id);
        return res.status(200).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

customers.delete('/customer/card/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    try {
        const result = await customerService.deleteCardById(id);
        return res.status(200).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})
    
module.exports = customers;