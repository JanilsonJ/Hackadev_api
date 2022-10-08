const db = require("../infra/conection.js");

const productExists = async (id) => {
    const product = await db.query(`SELECT * FROM product WHERE id = ${id}`);

    return product.length === 0
}

const getProdutos = () => {
    return db.query(`SELECT * FROM product ORDER BY (disable is false) DESC`);
}

const getProdutosFiltered = async (filter) => {
    if (filter === 'Promoção')
        return await db.query(`SELECT * FROM product WHERE porcent_discount > 0 AND disable = false ORDER BY porcent_discount DESC`);

    return await db.query(`SELECT * FROM product 
        WHERE unaccent(name) ILIKE '%${filter}%' OR unaccent(category) ILIKE '%${filter}%' OR departament = '${filter}'
        ORDER BY (disable is false) DESC`);
}

const getProdutoById = async (id) => {
    if (await productExists(id)) 
        return `Produto(${id}) não encontrado.` 
      
    return await db.one(`SELECT * FROM product WHERE id = ${id} `);
}

const getProdutoBySku = async (sku) => {
    if (await productExists(sku)) 
        return `SKU(${sku}) não encontrado.` 
      
    return db.one(`SELECT * FROM product INNER JOIN product_attributes ON product_id = id WHERE sku = '${sku}'`);
}

const getProductSizesByID = async (id) => {
    if (await productExists(id)) 
        return `Produto(${id}) não encontrado.`

    return db.query(`SELECT * FROM product_attributes WHERE product_id = ${id}`)
}

const insertProduto = (data) => {
    const { name, category, departament, description, image1, image2, regular_price, actual_price, porcent_discount } = data;
    return db.query(`INSERT INTO product VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, false) RETURNING id; `, [name, category, departament, description, image1, image2, regular_price, actual_price, porcent_discount]);
}

const insertProdutoAttributes = (data) => {
    const { sku, product_id, size, available, stock } = data;
    return db.query(`INSERT INTO product_attributes VALUES ('${sku}', ${product_id}, '${size}', '${available}', ${stock});`);
}

const updateProdutoById = async (data) => {
    const { id, name, category, departament, description, image1, image2, regular_price, actual_price, porcent_discount } = data;

    return await db.query(`
        UPDATE product SET 
            name = '${name}',
            category = '${category}',
            departament = '${departament}',
            description = '${description}',
            image1 = '${image1}',
            image2 = '${image2}',
            regular_price = '${regular_price}',
            actual_price = '${actual_price}',
            porcent_discount = '${porcent_discount}'
        WHERE id = ${id}`
    );
}

const updateProdutoAttributesById = async (data) => {
    const { sku, available, stock } = data;

    return await db.query(`
        UPDATE product_attributes SET
            available = '${available}',
            stock = ${stock}
        WHERE sku = '${sku}'`
    );
}

const disableOrEnableProductById = async (id, disable) => {
    return await db.query(`
       UPDATE product SET disable = ${!disable} WHERE id = ${id};
    `);
}

const produtoData = {
    getProdutos,
    getProdutosFiltered,
    getProdutoById,
    getProdutoBySku,
    getProductSizesByID,
    insertProduto,
    insertProdutoAttributes,
    updateProdutoById,
    updateProdutoAttributesById,
    disableOrEnableProductById
}

module.exports = produtoData;