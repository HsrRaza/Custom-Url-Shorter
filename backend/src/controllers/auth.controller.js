import { ValidationError } from "../utils/errorHandler.js";
import { wrapAsync } from "../utils/tryCatch.js";
import { registerUserService } from "../services/auth.service.js";

export const register_user = wrapAsync(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ValidationError("All fields are required");
    }
    const user = await registerUserService(name, email, password);
    // res.cookie("token",user.token);
    res.status(201).json({
        success:true,
        message:"User created successfully",
        user
    })
    
});

export const login_user = wrapAsync(async (req, res) => {
    res.json({ message: "Login" });
})