import express from "express";

import { validateContribution } from "../Middlewares/validations";
import { authenticate } from "../../Utils/Permissions/authentication";
import controller from "../Controllers/index";
import { contributionsTable } from "../../db/tables";

const contributionsHandler = express.Router();
contributionsHandler.post(
  "/",
  authenticate,
  validateContribution,
  controller.addContribution
);

contributionsHandler.get(
  '/',
  authenticate,
  controller.fetchContributions
);

export default contributionsHandler;
