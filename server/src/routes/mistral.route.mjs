// server/src/routes/mistral.route.mjs

import { Router } from "express";
import { sendMistralMessage } from "../controllers/mistral.controller.mjs";

const router = Router();

router.get("/", sendMistralMessage);

export default router;
