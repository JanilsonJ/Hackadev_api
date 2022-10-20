const produtoData = require("../data/produtoData.js");

function isEmpyt (obj) {
    const objStringfy = JSON.stringify(obj)

    return objStringfy === '[]' || objStringfy === 'null';
}

exports.getProdutos = async () => {
    return await produtoData.getProdutos();
}

exports.getRelatedProducts = async (id) => {
    const {category, departament} = await produtoData.getProdutoById(id);

    return await produtoData.getRelatedProducts(category, departament, id);
}

exports.getProdutosFiltered = async (filter) => {
    const capitalizeFilter = filter?.charAt(0).toUpperCase() + filter?.slice(1);
    
    if (filter === 'Promoção')
        return await produtoData.getDiscountProducts();
        
    if (filter === 'Feminino' || filter === 'Masculino')
    return await produtoData.getGenderProducts(filter);
        
    return await produtoData.getProdutosFiltered(capitalizeFilter);
}

exports.getProdutoById = async (id) => {
    const product = await produtoData.getProdutoById(id);
    
    if (isEmpyt(product))
        throw new Error(`Produto de id igual à ${id} não encontrado!`)

    return product;
}

exports.getProdutoBySku = async (sku) => {
    const product = await produtoData.getProdutoBySku(sku);

    if (isEmpyt(product))
        throw new Error(`Produto com sku igual à '${sku}' não encontrado!`)

    return product;
}

exports.getProductSizesByID = async (id) => {
    const sizes = await produtoData.getProductSizesByID(id);

    if (isEmpyt(sizes))
        throw new Error(`Tamanhos para o produto de ${id} não encontrados!`)

    return sizes;
}

exports.insertProduto = async (data) => {
    const { name, category, departament, description, image1, image2, regular_price, actual_price, porcent_discount, PP, P, M, G, GG } = data;

    if (name === undefined || category === undefined || departament === undefined || 
        isNaN(regular_price) || isNaN(actual_price) || isNaN(porcent_discount) ||
        isNaN(PP) || isNaN(P) || isNaN(M) || isNaN(G) || isNaN(GG))
        throw new Error(`Dados insuficientes para a adição do produto ou com erros!`)

    const {id: idOfInsert} = await produtoData.insertProduto(name, category, departament, description, image1, image2, regular_price, actual_price, porcent_discount);

    return await produtoData.insertProdutoAttributes(idOfInsert, P, PP, M, G, GG);
}

exports.updateProdutoById = async (data) => {
    const { id, name, category, departament, description, image1, image2, regular_price, actual_price, porcent_discount, disable, PP, P, M, G, GG } = data;

    if (isNaN(id) || name === undefined || category === undefined || departament === undefined || 
        isNaN(regular_price) || isNaN(actual_price) || isNaN(porcent_discount) || disable === undefined)
        throw new Error(`Dados insuficientes para a atualizar o produto ou com erros!`)

    await produtoData.updateProdutoById(id, name, category, departament, description, image1, image2, regular_price, actual_price, porcent_discount, disable);

    await produtoData.updateProdutosQuantityBySku(id, PP, P, M, G, GG);

    return;
}

exports.disableOrEnableProductById = async (body) => {
    const { id, disable } = body;
    
    return await produtoData.disableOrEnableProductById(id, disable);
}