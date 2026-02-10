import ShortUrl from "../models/shortUrl.models.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {

    const newUrl = new ShortUrl({
        full_url: longUrl,
        short_url: shortUrl,
    });

    if(userId){
        newUrl.user_id = userId;
    }
    newUrl.save();
    
}