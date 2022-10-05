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

produtos.put('/products/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;
    const data = req.body

    const result = await produtoService.updateProdutoById(id, data);
    return res.status(200).send(result)
})

produtos.delete('/products/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    const result = await produtoService.deleteProdutoById(id);
    return res.status(200).send(result)
})
    
module.exports = produtos;