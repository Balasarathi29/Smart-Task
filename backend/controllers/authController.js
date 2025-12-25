const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) =>{
    return jwt.sign({id : userId},process.env.JWT_SECRET,{expiresIn : '7d'});
}


const registerUser = async (req, res) => {
    try{
        const {name , email , password , profileImageUrl , adminInviteToken} = req.body;

        const userExists = await user.findOne({email});
        if(userExists){
            return  res.status(400).json({message : "User already exists"});
        }

        // Role
        let role = 'member';

        if (adminInviteToken && adminInviteToken === process.env.ADMIN_TOKEN) { 
            role = 'admin';
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        // create new user
        const User = await user.create({
            name,
            email,
            password : hashedPassword,
            profileImageUrl,
            role
        });

        // return response
        res.status(201).json({
            _id : User._id,
            name : User.name,
            email : User.email,
            profileImageUrl : User.profileImageUrl,
            role : User.role,
            token : generateToken(User._id)
        });

    }catch(error){
        res.status(500).json({message : "Server Error" , error: error.message});
    }
};
const loginUser = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message : "Server Error" , error: error.message});
    }
};
const getUserProfile = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message : "Server Error" , error: error.message});
    }
};
const updateUserProfile = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message : "Server Error" , error: error.message});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
};