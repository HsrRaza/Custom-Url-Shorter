
// import bcrypt from "bcrypt";
import { findUserByEmail ,createUser } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";
import { ConflictError } from "../utils/errorHandler.js";


export const registerUserService = async (name, email, password) => {
    const user = await findUserByEmail(email);
  
    if(user) throw new  ConflictError("User already exists");

    // const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await createUser(name,email,password);

    const token =await  signToken({id:newUser._id});

    return {newUser,token};
}