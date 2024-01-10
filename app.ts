// import express from "express";
// import dotenv from 'dotenv';
// import router from "./src/routes/routes";

import DarazScraper from "./src/scraper/daraz"
import fs from 'fs';
import { DarazProduct } from './src/interfaces/daraz_product';
import HamrobazaarScraper from "./src/scraper/hamrobazaar";
import GyapuScraper from "./src/scraper/gyapu";
import { createDbConnection, insertProduct } from "./src/services/db";
import { darazCategories } from "./categories";


// dotenv.config();

// const app = express();

// // For parsing the json body in POST request
// app.use(express.json());

// // For serving static files for swagger docs
// app.use(express.static("public"));


// app.use('/', router);

// const PORT = process.env.port || 3000;


// app.listen(PORT, () => {

//     console.log('App Listening on ' + PORT);
// });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const scrape = async () => {
    const db = createDbConnection();
    for (const category of darazCategories) {
        try {
            const products = await DarazScraper.scrapeProducts(category.name);
            insertProduct(db, products);
            await sleep(500);
            console.log('INSERTED category: ' + category.name + ' id: ' + category.id);
        } catch (e) {
            console.log('ERROR on category ' + category.name + ' id: ' + category.id)
        }
    }
}
scrape();