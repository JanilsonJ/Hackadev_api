DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS product_attributes;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS customer_address;
DROP TABLE IF EXISTS customer_card;
DROP TABLE IF EXISTS customer;

CREATE EXTENSION IF NOT EXISTS unaccent; -- Remove acentuação usando a função unaccent('Júnior')

CREATE TABLE product (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(15) NOT NULL,
    description VARCHAR(100),
    image1 TEXT, 
    image2 TEXT, 
    regular_price NUMERIC NOT NULL,
    actual_price NUMERIC NOT NULL,
    porcent_discount NUMERIC NOT NULL
);

CREATE TABLE product_attributes (
    sku VARCHAR(10) PRIMARY KEY NOT NULL UNIQUE,
    product_id INT NOT NULL,
    size VARCHAR(2) NOT NULL,
    available BOOLEAN NOT NULL,
    stock INTEGER NOT NULL, 
    
    FOREIGN KEY(product_id) REFERENCES product(id)
);

CREATE TABLE customer (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(80) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    birth DATE NOT NULL, 
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    tel VARCHAR(20) NOT NULL,
    adm BOOLEAN NOT NULL
);

CREATE TABLE customer_address (
    address_id SERIAL PRIMARY KEY NOT NULL,
    customer_id INT NOT NULL,
    addressee VARCHAR(50) NOT NULL, 
    cep VARCHAR(10) NOT NULL,
    address VARCHAR(60) NOT NULL,
    complement VARCHAR(60) NOT NULL,
    district VARCHAR(30) NOT NULL,
    city VARCHAR(20) NOT NULL,
    state VARCHAR(20) NOT NULL,
    principal_address BOOL NOT NULL,

    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE customer_card (
    card_id SERIAL PRIMARY KEY NOT NULL,
    customer_id INT NOT NULL,
    card_number VARCHAR(19) NOT NULL,
    card_name VARCHAR(80) NOT NULL,
    expiry DATE NOT NULL,
    cvv VARCHAR(3) NOT NULL, 
    payment_card BOOL NOT NULL,
    
    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE order_details (
    id VARCHAR(15) PRIMARY KEY NOT NULL,
    customer_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL,  
    total_price DECIMAL NOT NULL,
    installments INT NOT NULL,
    order_address VARCHAR(100) NOT NULL,
    
    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE order_items (
    order_items_id SERIAL PRIMARY KEY NOT NULL,
    order_details_id VARCHAR(15) NOT NULL,
    product_sku VARCHAR(10) NOT NULL,
    order_items_quantity INT NOT NULL,
    order_items_price NUMERIC NOT NULL,
    
    FOREIGN KEY(order_details_id) REFERENCES order_details(id),
    FOREIGN KEY(product_sku) REFERENCES product_attributes(sku)
);

INSERT INTO customer VALUES (DEFAULT, 'Janilson Júnior', '09876543210', TO_DATE('14/11/1998', 'DD/MM/YYYY'), 'janilsonej@hotmail.com', '1234', '+55 (62)98765-4321', true);
INSERT INTO customer_address VALUES (DEFAULT, 1, 'Janilson Júnior', '98765432', 'Rua Tubal da Silva Brandão', '926', 'Bancários', 'João Pessoa', 'PB', true);
INSERT INTO customer_card VALUES (DEFAULT, 1, '5203 1311 2113 6896', 'Janilson Júnior', TO_DATE('07/24', 'MM/YY'), '759', false);

INSERT INTO product VALUES (DEFAULT, 
                            'Blusa Verde Simples', 
                            'Blusa', 
                            NULL, 
                            'https://ima-ecommerce.netlify.app/assets/img/Products/Produto01_frente.webp',
                            'https://ima-ecommerce.netlify.app/assets/img/Products/Produto01_verso.webp',
                            59.90, 53.91, 10);
INSERT INTO product_attributes VALUES ('1PP', 1, 'PP', false, 0);
INSERT INTO product_attributes VALUES ('1P', 1, 'P', true, 20);
INSERT INTO product_attributes VALUES ('1M', 1, 'M', true, 15);
INSERT INTO product_attributes VALUES ('1G', 1, 'G', true, 32);
INSERT INTO product_attributes VALUES ('1GG', 1, 'GG', false, 0);

INSERT INTO product VALUES (DEFAULT, 
                            'Camisa botões na frente - Espaço', 
                            'Camisa', 
                            NULL, 
                            'https://ima-ecommerce.netlify.app/assets/img/Products/Produto11_frente.webp',
                            'https://ima-ecommerce.netlify.app/assets/img/Products/Produto11_verso.webp',
                            85.90, 85.90, 0);
INSERT INTO product_attributes VALUES ('2PP', 2, 'PP', false, 0);
INSERT INTO product_attributes VALUES ('2P', 2, 'P', true, 30);
INSERT INTO product_attributes VALUES ('2M', 2, 'M', true, 8);
INSERT INTO product_attributes VALUES ('2G', 2, 'G', true, 15);
INSERT INTO product_attributes VALUES ('2GG', 2, 'GG', true, 15);