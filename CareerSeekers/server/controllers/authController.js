import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const user = new User({ username, email, password: hashedPassword});
    try {
        await user.save();
        res.status(201).json('User created successfully!');
    }catch(error){
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser){
            return next(errorHandler('User not found', 404));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler('Wrong email or password', 401));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ validUser});
    } catch (error) {
        next(error);
    }
}