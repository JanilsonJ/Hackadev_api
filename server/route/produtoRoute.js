const express = require("express");

const produtoService = require('../service/produtoService.js');

const produtos = express.Router();

produtos.get('/products', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    try {
        const produto = await produtoService.getProdutos();
        res.status(200).send(produto)
    } catch (e) {
        res.status(400).send(e)
    }
})

produtos.get('/products/related/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    try {
        const { id } = req.params;

        const produtos = await produtoService.getRelatedProducts(id);
        res.status(200).send(produtos)
    } catch (e) {
        res.status(400).send(e)
    }
})

produtos.get('/products/:filter', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { filter } = req.query;
    
    try {
        const produto = await produtoService.getProdutosFiltered(filter);
        res.status(200).send(produto)
    } catch (e) {
        res.status(400).send(e)
    }
})

produtos.get('/products/product/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    try {
        const produto = await produtoService.getProdutoById(id);
        res.status(200).send(produto)
    } catch (e) {
        res.status(400).send(e)
    }
})

produtos.get('/products/sizes/:id', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { id } = req.params;

    try {
        const produto = await produtoService.getProductSizesByID(id);
        res.status(200).send(produto)
    } catch (e) {
        res.status(400).send(e)
    } 
})

produtos.get('/products/sku/:sku', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { sku } = req.params;  
    
    try {
        const produto = await produtoService.getProdutoBySku(sku);
        res.status(200).send(produto)
    } catch (e) {
        res.status(400).send(e)
    }
})

produtos.post('/products', async (req, res) => {
    //Compartilhar informações entre servidores diferentes
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const data = req.body

    try {
        const idOfInsert = await produtoService.insertProduto(data);
        return res.status(200).send(idOfInsert)
    } catch (e) {
        res.status(400).send(e)
    }
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