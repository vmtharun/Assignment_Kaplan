import { Router } from "express";
import parser from "body-parser";


export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: false }));
  router.use(parser.json());
};
