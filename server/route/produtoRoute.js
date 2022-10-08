const express = require("express");

const produtoService = require('../service/produtoService.js');

const produtos = express.Router();

produtos.get('/products', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const produto = await produtoService.getProdutos();
    res.send(produto)
})

produtos.get('/products/:filter', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { filter } = req.query;
    
    const produto = await produtoService.getProdutosFiltered(filter);
    res.send(produto)
})

produtos.get('/products/product/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;
    const produto = await produtoService.getProdutoById(id);

    return res.status(200).send(produto);
})

produtos.get('/products/sizes/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;
    const produto = await produtoService.getProductSizesByID(id);

    return res.status(200).send(produto)    
})

produtos.get('/products/sku/:sku', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { sku } = req.params;
    const produto = await produtoService.getProdutoBySku(sku);

    return res.status(200).send(produto)    
})

produtos.post('/products', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    const idOfInsert = await produtoService.insertProduto(data);
    return res.status(200).send(idOfInsert)
})

produtos.post('/products_attributes', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    const idOfInsert = await produtoService.insertProdutoAttributes(data);
    return res.status(200).send(idOfInsert)
})

produtos.put('/product', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        const result = await produtoService.updateProdutoById(data);
        return res.status(200).send(result)
    } catch (error) {
        return res.status(400).send(error)
    }
})

produtos.put('/product_attributes', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        const result = await produtoService.updateProdutoAttributesById(data);
        return res.status(200).send(result)
    } catch (error) {
        return res.status(400).send(error)
    }
})

produtos.put('/disable_enable_product', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const body = req.body;

    try {
        const result = await produtoService.disableOrEnableProductById(body);
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
})
    
module.exports = produtos;