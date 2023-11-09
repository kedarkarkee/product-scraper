import { NextFunction, Request, Response } from "express";
import DarazScraper from "../scraper/daraz";

export const searchController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchText = req.query.q;
        if (!searchText) {
            throw { message: 'Please provide a search text' };
        }
        const products = await getSearchResponse(searchText as string);
        return res.status(200).json({
            products
        })
    } catch (e) {
        return next(e);
    }
}

const getSearchResponse = async (key: string) => {
    const products = await DarazScraper.findProducts(key);
    return products;
}