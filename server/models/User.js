import { Schema, model, } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    date_of_joining:{ 
        type: Date,
        required: true
    },
    experience: {
        type :String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    }

},{
    timestamps: true
});

const User = model('User',userSchema)

export default User;