const fs = require("fs");
import sqlite3 from 'sqlite3';
import { DbProduct } from '../interfaces/db_product';
const filepath = "./products.db";

export const createDbConnection = () => {
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
    } else {
        const db = new sqlite3.Database(filepath, (error) => {
            if (error) {
                return console.error(error.message);
            }
            createTable(db);
        });
        console.log("Connection with SQLite has been established");
        return db;
    }
}

const createTable = (db: sqlite3.Database) => {
    db.exec(`
  CREATE TABLE products
  (
    id INTEGER PRIMARY KEY,
    product_id INTEGER UNIQUE,
    name TEXT,
    category TEXT,
    brand TEXT,
    sale_price REAL,
    market_price REAL,
    seller TEXT,
    rating REAL,
    reviews REAL,
    description TEXT,
    product_url TEXT,
    image_url TEXT
  );
`);
}
export const insertProduct = (db: sqlite3.Database, products: DbProduct[]) => {
    const productQuery =
        "INSERT OR IGNORE INTO products (product_id, name, category, brand, sale_price, market_price, seller, rating, reviews, description, product_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const statement = db.prepare(productQuery);

    for (const product of products) {
        statement.run(productToList(product), function (err) {
            if (err) {
                console.error(err.message);
                console.error(product);
            }
        });
    }
    statement.finalize();
}
const productToList = (product: DbProduct) => {
    return [
        product.product_id, product.name, product.category, product.brand, product.sale_price, product.market_price, product.seller, product.rating, product.reviews, product.description, product.product_url, product.image_url
    ];
}