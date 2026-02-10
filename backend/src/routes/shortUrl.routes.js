import express from "express";
import { createShortUrl, getAllShortUrls } from "../controllers/shorturl.controllers.js";

const router = express.Router();

router.post("/create", createShortUrl);
router.get("/:id", getAllShortUrls);

export default router;  