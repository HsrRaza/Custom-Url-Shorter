
import ShortUrl from "../models/shortUrl.models.js";
import { createShortUrlWithoutUserService } from "../services/shortUrl.service.js";
const createShortUrl = async (req, res) => {

    const { url } = req.body;

    const shortUrl = await createShortUrlWithoutUserService(url);
    res.send(process.env.APP_URL + shortUrl)
};



const getAllShortUrls = async (req, res) => {

    const { id } = req.params;
    try {
        const url = await ShortUrl.find({ short_url: id });

        if (url && url.length > 0) {
            return res.redirect(url[0].full_url).status(302).json({ message: "Successfull fetched short URL" });
        } else {
            return res.status(404).json({ message: "Not found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }


};

export { createShortUrl, getAllShortUrls };
