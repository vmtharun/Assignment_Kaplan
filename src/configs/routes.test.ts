import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware } from "../utils";
import middleware from "../middleware";
import errorHandlers from "../middleware/errorHandlers";
import {Routes} from "../configs/routes";


describe("routes", () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    Routes.ConfigureRoutes(router);
    applyMiddleware(errorHandlers, router);
  });

  test("health check", async () => {
    const response = await request(router).get("/");
    expect(response.status).toEqual(200);
  });

  test("a non-existing api method", async () => {
    const response = await request(router).get("/api/v11/assignment");
    expect(response.status).toEqual(404);
  });

  test("an invalid param", async () => {
    const response = await request(router).get("/api/v1/assignment/123");
    expect(response.status).toEqual(400);
  });
});