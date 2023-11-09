import { Request, Response, NextFunction } from "express";

export const error404 = (req: Request, res: Response) => {
    return res.status(404).json({

        error_message: 'No such endpoint exists.'
    });
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(500).json({
        error_message: err.message ?? 'Interval Server Error. Please try again later',
    });
}