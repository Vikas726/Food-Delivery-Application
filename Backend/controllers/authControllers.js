const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const register = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
        const exists = await User.findOne({email
        });
        if(exists){
            return res.status(400).json({message:'User already exists'});
        }
        const user = await User.create({username,email,password});
        const token = await user.createToken();
        res.cookie('token',token,{httpOnly:true});
        res.status(201).json({message:"User Created",user,token});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User
        .findOne({email});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const isMatch = await user.comparepassword(password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const token = await user.createToken();
        res.cookie('token',token,{httpOnly:true});
        res.status(200).json({message:"Login Successful",token});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id
        );
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({user});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateUser = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
        const user = await User.findById(req.user.id
        );
        user.username = username;
        user.email = email;
        user.password = password;
        await user.save();
        res.status(200).json({user});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteUser = async (req,res)=>{
    try {
        const exists = await User.findById(req.params.id
        );
        if(!exists){
            return res.status(404).json({message:'User not found'});
        }
        await User.findByIdAndDelete(req.params.id
        );
        res.status(200).json({message:'User deleted'});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getAllUser = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({users});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}


module.exports = {
    register,
    login,
    getUser,
    updateUser,
    deleteUser,
    getAllUser
}