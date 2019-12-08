import http from "http";
import express from "express";
import { applyMiddleware } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import { DbConfig } from "./configs/dbConfig";
import { Routes } from "./configs/routes";


process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

const app = express();

// Config MongoDb
DbConfig.mongoSetup();

applyMiddleware(middleware, app);
Routes.ConfigureRoutes(app);
applyMiddleware(errorHandlers, app);

const { PORT = 3000 } = process.env;
const server = http.createServer(app);

server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
);