import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import { errorHandler } from "../utils/error.js";


    
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
       return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
        // Hash password before saving
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 12);
        }
        // Update user in the database
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        }, { new: true });
        // Remove password from the user object
        const { password, ...rest } = updatedUser._doc;
        // Send the updated user object
        res.status(200).json(rest);
    } catch (error) {
        
    }
};