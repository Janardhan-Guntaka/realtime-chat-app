import { compare } from "bcrypt";
import User from "../models/UserModel.js"; // import User model from UserModel
import jwt from "jsonwebtoken";
import {renameSync, unlinkSync} from "fs"; // import renameSync from fs to rename files

const maxAge = 3 * 24 * 60 * 60 *1000; // max age for jwt token, 3 days, 24 hours, 60 minutes, 60 seconds, 1000 milliseconds
const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge}); // create a jwt token with email, userId, jwt key and max age
}

export const signUp = async (request, response, next) =>{ // controller for signing up a user
    try{
        const {email, password} = request.body; // getting email and password from request body
        if(!email || !password){
            return response.status(400).send('Please provide email and password'); // if email or password is not provided, return error
        }
        const user = await User.create({email, password}); // create a new user with email and password
        response.cookie('jwt', createToken(user.email, user.id),{
            maxAge,
            secure:true, 
            sameSite:'None',

        });
        return response.status(201).json({
            user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
            }
        });
}
    catch(error){
        console.error(error);
        response.status(500).send('Error in creating user');
    }
}

export const Login = async (request, response, next) => {
    try{
        const {email, password} = request.body; // getting email and password from request body
        if(!email || !password){
            return response.status(400).send('Please provide email and password'); // if email or password is not provided, return error
        }
        const user = await User.findOne({email}); // find a user with email
        if(!user){
            return response.status(404).send('User not found'); // if user is not found, return error
        }
        const auth = await compare(password, user.password); // compare password with hashed password
        if(!auth){
            return response.status(401).send('Invalid password'); // if password is invalid, return error
        }
        response.cookie('jwt', createToken(user.email, user.id),{
            maxAge,
            secure:true, 
            sameSite:'None',

        });
        return response.status(200).json({
            user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            color: user.color,
            }
        });
}
    catch(error){
        console.error(error);
        response.status(500).send('Error in creating user');
    }
}

export const getUserInfo = async (request, response, next) => {
    try
    {
        console.log(request.userId);
        const userData = await User.findById(request.userId); // find user by userId from request object
        if(!userData) return response.status(404).send('User not found'); // if user is not found, return error

        // return the user info as JSON response
        return response.status(200).json({
            
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,

        });
    }
    catch(error)
    {
        console.error(error);
        response.status(500).send('internal server error');
    }
}


export const updateProfile = async (request, response, next) => {
    try
    {
        const {userId} = request;
        const {firstName, lastName, color} = request.body; // getting firstName, lastName and color from request body
        if(!firstName || !lastName) {
            return response.status(400).send('Please provide first name, last name and color'); // if firstName, lastName or color is not provided, return error
        }

        console.log('updateProfile', { userId: request.userId, body: request.body });
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                color,
                profileSetup: true, // set profileSetup to true
            },
            {
                new:true, runValidators:true // return the updated user data and run validators
            }
        );

        if (!userData) {
         return response.status(404).send('User not found');
    }
        // return the user info as JSON response
        return response.status(200).json({
            user: {
                id: userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
            }
        });
    } catch(error) {
        console.error('Profile update error:', error);
        return response.status(500).json({ message: 'Error updating profile' });
    }
}




export const addProfileImage = async (request, response, next) => {
    try
    {

        if(!request.file)
        {
            return response.status(400).send('Please provide a profile image'); // if profile image is not provided, return error
        }
        // return the user info as JSON response
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + request.file.originalname; // create a file name with date and original name of the file
        renameSync(request.file.path, fileName); // rename the file to the new file name
        const updatedUser = await User.findByIdAndUpdate(
            request.userId,
            {image: fileName},
            {new : true, runValidators: true} // return the updated user data and run validators
        )
        return response.status(200).json({
            image: updatedUser.image, // return the image path
        });
    } catch(error) {
        console.error('Profile update error:', error);
        return response.status(500).json({ message: 'Error updating profile' });
    }
}


export const removeProfileImage = async (request, response, next) => {
    try
    {
        const {userId} = request;
        const user = await User.findById(userId);
        if(user.image)
        {
            unlinkSync(user.image); 

        }

        user.image = null;
        await user.save(); // save the user data after removing the image

        return response.status(200).json({ message: "Profile image removed successfully" });
    } catch(error) {
        console.error('Profile update error:', error);
        return response.status(500).json({ message: 'Error updating profile' });
    }
}


export const logout = async (request, response, next) => {
    try
    {
        response.cookie('jwt', '', {maxAge: 1, secure:true, sameSite:'None'}); // clear the jwt cookie by setting maxAge to 1
        response.status(200).send('Logged out successfully'); // send success message
    } catch(error) {
        return response.status(500).json({ message: 'Internal server error' });
    }
}