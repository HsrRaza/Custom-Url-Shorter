import ShortUrl from "../models/shortUrl.modes.js";
import { nanoid } from "nanoid";

const createShortUrl = async (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }

    try {
        const short_url = nanoid(7);
        const newUrl = await ShortUrl.create({
            full_url: url,
            short_url: short_url,
        });

        if (!newUrl) {
            return res.status(400).json({ message: "Failed to create short URL" });
        }

        return res.status(201).json(newUrl);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }



};



const getAllShortUrls = async (req, res) => {

    const { id } = req.params;
    try {
        const url = await ShortUrl.find({ short_url: id });
        
        if (url && url.length > 0) {
            return res.redirect(url[0].full_url);
        } else {
            return res.status(404).json({ message: "URL not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { createShortUrl, getAllShortUrls };
