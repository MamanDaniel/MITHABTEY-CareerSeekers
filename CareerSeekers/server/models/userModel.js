import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    role: {
        type: String,
        enum: ['Regular', 'Admin'],
        default: 'Regular',
    },
    traits: {
        Business: {
            type: Number,
            default: 0
        },
        'General Culture': {
            type: Number,
            default: 0
        },
        'Arts and Entertainment': {
            type: Number,
            default: 0
        },
        Science: {
            type: Number,
            default: 0
        },
        Organization: {
            type: Number,
            default: 0
        },
        Service: {
            type: Number,
            default: 0
        },
        Outdoor: {
            type: Number,
            default: 0
        },
        Technology: {
            type: Number,
            default: 0
        }
    },
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;