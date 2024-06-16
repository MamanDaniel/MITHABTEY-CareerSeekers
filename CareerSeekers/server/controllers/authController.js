import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    try {
        await user.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        // if response conatain 'E11000 duplicate key error' return email already exists
        if (error.message.includes('E11000 duplicate key error')) {
            return next(errorHandler(400, 'Email already exists!'));
        }
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong email or password'));
        }
        // create a token for the user based on the user id in the database
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // remove password from the user object
        const { password: pass, ...rest } = validUser._doc;
        // send the token in a cookie
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

    } catch (error) {
        next(error);
    }
}

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').json('User signed out successfully!');
    } catch (error) {
        next(error);
    }
}