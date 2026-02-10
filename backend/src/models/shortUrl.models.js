import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true,
        index:true,
        unique:true,    
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

export default ShortUrl;    