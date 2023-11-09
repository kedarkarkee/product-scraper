import { randomInt } from "crypto";
import { NextFunction, Request, Response } from "express";
import DarazScraper from "../scraper/daraz";

export const homeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getHomeResponse();
        return res.status(200).json(
            {
                products
            }
        );
    } catch (e) {
        return next(e);
    }
}

const getHomeResponse = async () => {
    const alphabets = 'ertyuiopasdfghjklcvbnm';
    const randInt = randomInt(alphabets.length);
    const randAlphabet = alphabets.charAt(randInt);
    const products = await DarazScraper.findProducts(randAlphabet);
    return products;
} 