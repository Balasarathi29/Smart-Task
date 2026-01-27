const user = require('../models/User');
const bcrypt = require('bcrypt');
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
        const {email , password} = req.body;
        const User = await user.findOne({email});
        if(!User){
            return res.status(400).json({message : "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, User.password);
        if(!isMatch){
            return res.status(400).json({message : "Invalid credentials"});
        }
        res.json({
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
const getUserProfile = async (req, res) => {
    try{
        const User = await user.findById(req.user.id).select('-password');
        if(!User){
            return res.status(404).json({message : "User not found"});
        }
        res.json(User);
    }catch(error){
        res.status(500).json({message : "Server Error" , error: error.message});
    }
};
const updateUserProfile = async (req, res) => {
    try{
        const User = await user.findById(req.user.id);
        if(!User){
            return res.status(404).json({message : "User not found"});
        }
        user.name = req.body.name || User.name;
        user.email = req.body.email || User.email;
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password , salt);
        }
        const updatedUser = await User.save();
        res.json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            profileImageUrl : updatedUser.profileImageUrl,
            role : updatedUser.role,
            token : generateToken(updatedUser._id)
        });
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