import * as cheerio from "cheerio";

import DarazInstance, { Daraz } from "../sources/daraz";
import { DarazProduct } from "../interfaces/daraz_product";

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
}

export default DarazScraper;