const User = require('../models/userModel')
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



module.exports = {
	index, newUser, getUser, updateUser
}
