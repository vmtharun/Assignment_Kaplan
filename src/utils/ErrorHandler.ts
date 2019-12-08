import { Response, NextFunction } from "express";
import { HTTPClientError, HTTP404Error } from "../utils/httpErrors";
import { Error as mongooseErr } from "mongoose";
import { MongoErrorHandler } from "./MongoErrorHandler";

export const notFoundError = (msg: string = "Method not found.") => {
    throw new HTTP404Error(msg);
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    } else {
        next(err);
    }
};

export const mongooseError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof mongooseErr) {
        console.warn(err);
        return MongoErrorHandler.handleError(err, res);
    } else {
        next(err);
    }
};

export const serverError = (err: any, res: Response, next: NextFunction) => {
    console.error(err);
    if (err && err.code && err.code == 11000 && err.keyValue) {
        // Not catching as mongoose Error, so hacking it here
        const message = `An assignment with name: "${err.keyValue.name}" already exists`;
        res.status(409).send(message);
    } else {
        if (process.env.NODE_ENV === "production") {
            res.status(500).send("Internal Server Error");
        } else {
            res.status(500).send(err.stack);
        }
    }
};