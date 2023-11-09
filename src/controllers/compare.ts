import { NextFunction, Request, Response } from "express";
import { generateKeywords } from "../utils/keyword";
import GyapuScraper from "../scraper/gyapu";
import HamrobazaarScraper from "../scraper/hamrobazaar";

export const compareController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productName = req.body.productName;
        if (!productName) {
            throw { message: 'Please provide a product name' };
        }
        const products = await getCompareResponse(productName as string);
        return res.status(200).json({
            products
        })
    } catch (e) {
        return next(e);
    }
}

const getCompareResponse = async (productName: string) => {
    const token = generateKeywords(productName)[1];
    const gyapuProducts = await GyapuScraper.findProducts(token);
    const hamroProducts = await HamrobazaarScraper.findProducts(token);
    const products = shuffle([...gyapuProducts, ...hamroProducts]);
    return products;
}

const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}; 