
import { getUrlFromShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUserService } from "../services/shortUrl.service.js";
import { NotFoundError } from "../utils/errorHandler.js";
import { wrapAsync } from "../utils/tryCatch.js";




const createShortUrl = wrapAsync(async (req, res) => {

    const { url } = req.body;
    
    const shortUrl = await createShortUrlWithoutUserService(url);
    
    res.status(201).json({
        success:true,
        message:"Short URL created successfully",
        shortUrl:process.env.APP_URL + shortUrl
    })
});



const redirectFromShortUrl = wrapAsync(async (req, res, ) => {
    
    const { id } = req.params;
    
    const url = await getUrlFromShortUrl(id)
    
    if(!url) throw new NotFoundError("URL not found");
        
    console.log(url);
    res.redirect(url.full_url);


  
});

export { createShortUrl, redirectFromShortUrl };
