const express = require("express");

const orderService = require("../service/orderService.js");

const orders = express.Router();

orders.get('/order', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    try{
        const result = await orderService.getOrders();
        res.status(200).send(result)
    } catch (e) {
        res.status(400).send(`${e.name}: ${e.message}`)
    }
})

orders.get('/order/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;
    
    try{
        await orderService.getOrderById(id);
        return res.status(200)
    } catch (e) {
        res.status(400).send(`${e.name}: ${e.message}`)
    }    
})

orders.get('/orders/customer/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    try{
        const result = await orderService.getOrderByUserId(id);
        return res.status(200).send(result)
    } catch (e) {
        res.status(400).send(`${e.name}: ${e.message}`)
    }    
})

orders.post('/order', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try{
        await orderService.insertOrder(data);
        res.status(200).send();
    } catch (e) {
        res.status(400).send(`${e.name}: ${e.message}`)
    }
})
    
module.exports = orders;