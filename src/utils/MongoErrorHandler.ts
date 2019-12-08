import { Response } from "express";

export class MongoErrorHandler {

    public static handleError(err: any, res: Response) {
        this.formatError(err, res);
    }

    private static formatError(err: any, res: Response) {
        let status: number = 500, message: string = "MongoDb Error!!! ";
        if (err && err.name) {
            switch (err.name) {
                case 'ValidationError':
                    status = 400;
                    message = MongoErrorHandler.formatValidationErrorMessage(err.message);
                    break;
                case 'CastError':
                    status = 400;
                    message = MongoErrorHandler.formatCastErrorMessage(err);
                    break;
                case 'MongoError':
                    if (err.code == 11000) {
                        message = `An assignment with ${err.keyValue} already exists`;
                        status = 409;
                    } else {
                        message = err.message;
                    }
                    break;
                default:
                    message = message + err.message;
            }
        }
        res.status(status).send(message);
    }

    private static formatValidationErrorMessage(message: string) {
        message = message.replace(/Path/g, '');
        message = message.replace(/`/g, '');
        message = message.replace(/[.*+?^${}()|[\]\\]/g, '');

        return message;
    }

    private static formatCastErrorMessage(err: any) {
        Object.keys(err).forEach(field => {
            console.log(field + " => " + err[field])
        });

        return `Field: ${err.path}'s value: ${err.value} is invalid! ${err.value} cann't be casted to ${err.kind}`;
    }
}