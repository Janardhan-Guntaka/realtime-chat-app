import mongoose from "mongoose";
import {genSalt, hash, compare} from "bcrypt"; // bcrypt is used to hash passwords, hash is used to hash passwords, compare is used to compare passwords

const userSchema = new mongoose.Schema({ // schema for user, for defining the structure of user
    email:{
        type:String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        unique: true,
    },
    firstName:{
        type: String,
        required: false,
    },
    lastName:{
        type: String,
        required: false,
    },
    image:{
        type:String,
        required: false,
    },
    color:{
        type:Number,
        required: false,
    },
    profileSetup:{
        type:Boolean,
        default: false,
    }, // to check if user has completed profile setup
});

userSchema.pre('save', async function(next){ // pre save hook to hash password before saving, next is used to move to next middleware
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})



const User= mongoose.model('Users', userSchema); // model for user, Users is the collection name where user documents will be stored, User is the model name provides ingterface to intereact with the collection

export default User; // exporting the model for user