import express from "express";

import * as setupController from "../controllers/setupController";

const router = express.Router();

router.route("/").get(setupController.setup);

export default router;
