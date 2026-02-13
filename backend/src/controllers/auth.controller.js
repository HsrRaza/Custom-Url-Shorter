import { ValidationError } from "../utils/errorHandler.js";
import { wrapAsync } from "../utils/tryCatch.js";
import { registerUserService } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";
export const register_user = wrapAsync(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ValidationError("All fields are required");
    }
    const token = await registerUserService(name, email, password);
    res.cookie("accessToken",token, cookieOptions);
    
    res.status(201).json({
        success:true,
        message:"Login SuccessFull",
        token:token.token,
    })
    
});

export const login_user = wrapAsync(async (req, res) => {
    const {email , password} = req.body;
    if(!email || !password){
        throw new ValidationError("All fields are required");
    }
    const token = await loginUserService(email, password);
    res.cookie("accessToken",token, cookieOptions);
    res.status(200).json({
        success:true,
        message:"Login SuccessFull",
        token:token.token,
    })
})