import express from "express";
import { createShortUrl, redirectFromShortUrl } from "../controllers/shorturl.controllers.js";

const router = express.Router();

router.post("/api/create", createShortUrl);
router.get("/:id",redirectFromShortUrl );
export default router;  