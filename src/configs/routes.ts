import v1Routes from "./../api/v1";
import v2Routes from "./../api/v2";
import { applyRoutes } from "./../utils";
import { Router } from 'express'

export class Routes {

    constructor() { }
    public static ConfigureRoutes(app: Router): void {

        app.get('/', (req, res) => {
            res.status(200).send({
                message: 'Health Check Success'
            })
        });

        // loads routes based on the version of apis
        app.use('/api/v1', applyRoutes(v1Routes));
        app.use('/api/v2', applyRoutes(v2Routes));
    }
}