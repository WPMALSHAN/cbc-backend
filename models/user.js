import mongoose from "mongoose";

const userschema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        firstname: {
            type: String,
            required: true,
        },

        lastname: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            required: true,
            default: "user", // Default role is 'user'
        },

        isblocked:{
            type: Boolean,
            default: false, // Default value is false
        },

        isEmailVerified: {
            type: Boolean,
            default: false, // Default value is false
        },

        profilepicture:{
            type: String,
            default: "https://res.cloudinary.com/dz1qj3x4h/image/upload/v1735681234/DefaultProfilePicture.png", // Default profile picture URL
        }
            
    }


);

const User = mongoose.model("User", userschema);


export default User;