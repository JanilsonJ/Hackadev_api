const produtoData = require("../data/produtoData.js");

const getProdutos = () => {
    return produtoData.getProdutos();
}

const getProdutosFiltered = (filter) => {
    filter = filter?.charAt(0).toUpperCase() + filter?.slice(1);

    return produtoData.getProdutosFiltered(filter);
}

const getProdutoById = async (id) => {
    return await produtoData.getProdutoById(id);
}

const getProdutoBySku = (sku) => {
    return produtoData.getProdutoBySku(sku);
}

const getProductSizesByID = (id) => {
    return produtoData.getProductSizesByID(id);
}

const insertProduto = (data) => {
    return produtoData.insertProduto(data);
}

const insertProdutoAttributes = (data) => {
    const sizes = ['PP', 'P', 'M', 'G', 'GG']

    try {
        sizes.forEach(size => {
            const attributes = {
                sku: data.product_id + size, 
                product_id: data.product_id, 
                size: size, 
                available: (data[size] > 0), 
                stock: data[size]
            }
    
            produtoData.insertProdutoAttributes(attributes)
        })
        
        return true
    } catch (error) {
        return error;
    }
}

const updateProdutoById = (id, data) => {
    return produtoData.updateProdutoById(id, data);
}

const deleteProdutoById = (id) => {
    return produtoData.deleteProdutoById(id);
}

const produtoService = {
    getProdutos,
    getProdutosFiltered,
    getProdutoById,
    getProdutoBySku,
    getProductSizesByID,
    insertProduto,
    insertProdutoAttributes,
    updateProdutoById,
    deleteProdutoById
};

module.exports = produtoService;