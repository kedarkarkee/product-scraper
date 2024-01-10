import * as cheerio from "cheerio";

import DarazInstance, { Daraz } from "../sources/daraz";
import { DarazProduct } from "../interfaces/daraz_product";
import { DbProduct } from "../interfaces/db_product";
import { darazCategories } from "../../categories";
import { getRandomUserAgent } from "./ua";

namespace DarazScraper {

    export const findProducts = async (keyword: string) => {
        const { data } = await DarazInstance.get(Daraz.catalogPath, {
            params: {
                'q': keyword
            }
        });
        const $ = cheerio.load(data);

        const script = $('head > script').get(3).firstChild['data'].replace('window.pageData=', '');
        const parsedScript = JSON.parse(script);
        const listItems = parsedScript.mods.listItems;
        const finalItems: DarazProduct[] = [];
        for (const item of listItems) {
            const { name, productUrl, image, originalPrice, price, ratingScore, review, description } = item;
            const darazItem: DarazProduct = {
                name,
                productUrl,
                image,
                originalPrice,
                price,
                ratingScore,
                review,
                description,
                source: 'daraz'
            };
            finalItems.push(darazItem);

        }
        return finalItems;

    }
    export const scrapeProducts = async (keyword: string) => {
        const { data } = await DarazInstance.get(Daraz.catalogPath, {
            params: {
                'q': keyword
            },
            headers: {
                'User-Agent': getRandomUserAgent()
            }
        });
        const $ = cheerio.load(data);

        const script = $('head > script').get(3).firstChild['data'].replace('window.pageData=', '');
        const parsedScript = JSON.parse(script);
        const listItems = parsedScript.mods.listItems;
        const finalItems: DbProduct[] = [];
        for (const item of listItems) {
            let itemCategory: {
                id: string;
                name: string;
            };
            for (const cat of item.categories) {
                const fCat = darazCategories.find(e => e.id == cat.toString());
                if (fCat) {
                    itemCategory = fCat;
                    break;
                }
            }
            if (!itemCategory) {
                itemCategory = { name: keyword, id: "" };
            }
            const darazItem: DbProduct = {
                name: item.name.replace('|', '').replace('"', '').replace('″', ''),
                brand: item.brandName ?? "No Brand",
                description: item.description.join(' '),
                product_id: Number(item.itemId),
                image_url: item.image,
                product_url: item.productUrl,
                rating: Number(item.ratingScore ?? "0"),
                reviews: Number(item.review ?? "0"),
                market_price: Number(item.originalPrice ?? item.price),
                sale_price: Number(item.price),
                seller: item.sellerName,
                category: itemCategory.name,
            };
            finalItems.push(darazItem);
        }
        return finalItems;

    }
}

export default DarazScraper;