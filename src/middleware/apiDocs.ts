import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./../configs/swagger.json";

// Implemented only for Get Assignment api as of now
export const handleAPIDocs = (router: Router) =>
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));