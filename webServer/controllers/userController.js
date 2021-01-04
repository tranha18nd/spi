const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const index = async(req, res, next) => {
	try {
		const users = await User.find({})
		return res.status(200).json({users})
	}catch(err) {
		next(err)
	}
}

const newUser = async(req, res, next) => {
	try {
		const newUser = new User(req.value.body)
		await newUser.save()
		return res.status(201).json({user:newUser})
	} catch(err) {
		next(err)
	}
}

const getUser = async(req, res, next) =>{
	try{
		const {userID} = req.params
		const user = await User.findById(userID)
		return res.status(200).json({user})
	} catch(err){
		next(err)
	}
}

const updateUser = async(req, res, next) =>{
	try{
		const {userID} = req.params
		const newUser = new User(req.body)
		await User.findOneAndUpdate({_id:userID}, newUser)
		return res.status(200).json({newUser})
	} catch(err){
		next(err)
	}
}

const login = async(req, res, next)=>{
	try{
		let userName = req.body.userName
		let passWord = req.body.passWord
		const user = await User.findOne({user:userName,pass:passWord})
		let token = jwt.sign({_id:user._id}, process.env.SECRET_KEY)
		return res.status(200).json({
			message:"Login Success",
			token:token
		})
	} catch (err){
		next(err)
	}
}

module.exports = {
	index, newUser, getUser, updateUser, login
}
