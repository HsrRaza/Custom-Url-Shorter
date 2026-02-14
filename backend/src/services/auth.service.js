
// import bcrypt from "bcrypt";
import { findUserByEmail ,createUser } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";
import { ConflictError, NotFoundError } from "../utils/errorHandler.js";


export const registerUserService = async (name, email, password) => {
    const user = await findUserByEmail(email);
  
    if(user) throw new  ConflictError("User already exists");

    // const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await createUser(name,email,password);

    const token = await  signToken({id:newUser._id});

    return {token};
}

export const loginUserService = async(email,password)=>{    
    const user = await findUserByEmail(email);
    
    // if(!user) throw new NotFoundError("User not found");
    // const isMatch = await bcrypt.compare(password,user.password);
    
    if(!user || user.password !== password) throw new UnauthorizedError("Invalid credentials");
    const token = await signToken({id:user._id});
    
    return {token};
}