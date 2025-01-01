import UserCollection from "../db/models/User.js";
 import SessionCollection from "../db/models/Session.js";
 import createHttpError from "http-errors";
 import bcrypt from "bcrypt";

 export const register = async payload => {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});
    if(user) {
        throw createHttpError(409, "User already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserCollection.create({...payload, password: hashPassword});

    return newUser;
};

