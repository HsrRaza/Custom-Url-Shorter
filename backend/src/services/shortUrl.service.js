import { saveShortUrl } from "../dao/shortUrl.js";

import { generateShortUrl } from "../utils/helper.js";


export const createShortUrlWithoutUserService = async (url) => {

    const shortUrl = await generateShortUrl(7);

    if (!shortUrl) throw new Error("Failed to generate short URL");

    await saveShortUrl(shortUrl, url);
    return shortUrl;


};

export const createShortUrlWithUserService = async (url, userId) => {
    const shortUrl = await generateShortUrl(7);
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
};

