const db = require("../infra/conection.js");

exports.getProdutos = () => {
    return db.query(`SELECT * FROM product ORDER BY (disable is false) DESC, name ASC`);
}

exports.getRelatedProducts = (category, departament, id) => {
    return db.query(`
        SELECT * FROM product 
        WHERE (departament = '${departament}' OR departament = 'Unissex') AND category = '${category}' AND id != ${id} AND disable = false
        ORDER BY porcent_discount DESC, name ASC
    `);
}

exports.getDiscountProducts = async () => {
    return await db.query(`
        SELECT * FROM product WHERE porcent_discount > 0 AND disable = false 
        ORDER BY porcent_discount DESC, name ASC`
    );
}

exports.getGenderProducts = async (filter) => {
    return await db.query(`SELECT * FROM product WHERE departament = '${filter}' OR departament = 'Unissex' ORDER BY (disable is false) DESC`);
}

exports.getProdutosFiltered = async (filter) => {
    return await db.query(`
        SELECT * FROM product 
        WHERE unaccent(name) ILIKE '%${filter}%' OR unaccent(category) ILIKE '%${filter}%' OR unaccent(departament) = '${filter}'
        ORDER BY (disable is false) DESC`
    );
}

exports.getProdutoById = async (id) => {
    return await db.oneOrNone(`SELECT * FROM product WHERE id = ${id} `);
}

exports.getProdutoBySku = async (sku) => {
    return await db.oneOrNone(`
        SELECT * FROM product 
        INNER JOIN product_attributes ON product_attributes.product_id = product.id 
        WHERE product_attributes.sku = '${sku}'
    `);
}

exports.getProductSizesByID = async (id) => {
    return await db.query(`SELECT * FROM product_attributes WHERE product_id = ${id}`)
}

exports.insertProduto = async (name, category, departament, description, image1, image2, regular_price, actual_price, porcent_discount) => {
    return await db.oneOrNone(`
        INSERT INTO product VALUES (DEFAULT, 
            '${name}', 
            '${category}', 
            '${departament}', 
            '${description}', 
            '${image1}', 
            '${image2}', 
            ${regular_price}, 
            ${actual_price}, 
            ${porcent_discount}, 
            false) 
        RETURNING id; `);
}

exports.insertProdutoAttributes = async (idOfIsert, P, PP, M, G, GG) => {
    return await db.query(`
        INSERT INTO product_attributes VALUES ('${idOfIsert}PP', ${idOfIsert}, 'PP', ${PP > 0}, ${PP});
        INSERT INTO product_attributes VALUES ('${idOfIsert}P', ${idOfIsert}, 'P', ${P > 0}, ${P});
        INSERT INTO product_attributes VALUES ('${idOfIsert}M', ${idOfIsert}, 'M', ${M > 0}, ${M});
        INSERT INTO product_attributes VALUES ('${idOfIsert}G', ${idOfIsert}, 'G', ${G > 0}, ${G});
        INSERT INTO product_attributes VALUES ('${idOfIsert}GG', ${idOfIsert}, 'GG', ${GG > 0}, ${GG});
    `);
}

exports.updateProdutoById = async (id, name, category, departament, description, image1, image2, regular_price, actual_price, porcent_discount, disable) => {
    return await db.query(`
        UPDATE product SET 
            name = '${name}',
            category = '${category}',
            departament = '${departament}',
            description = '${description}',
            image1 = '${image1}',
            image2 = '${image2}',
            regular_price = ${regular_price},
            actual_price = ${actual_price},
            porcent_discount = ${porcent_discount},
            disable = ${disable}
        WHERE id = ${id};`
    );
}

exports.updateProdutosQuantityBySku = async (id, PP, P, M, G, GG) => {
    return await db.query(`
        UPDATE product_attributes SET available = ${PP > 0}, stock = ${PP} WHERE sku = '${id}PP';
        UPDATE product_attributes SET available = ${P > 0}, stock = ${P} WHERE sku = '${id}P';
        UPDATE product_attributes SET available = ${M > 0}, stock = ${M} WHERE sku = '${id}M';
        UPDATE product_attributes SET available = ${G > 0}, stock = ${G} WHERE sku = '${id}G';
        UPDATE product_attributes SET available = ${GG > 0}, stock = ${GG} WHERE sku = '${id}GG';
    `
    );
}

exports.disableOrEnableProductById = async (id, disable) => {
    return await db.query(`
       UPDATE product SET disable = ${!disable} WHERE id = ${id};
    `);
}