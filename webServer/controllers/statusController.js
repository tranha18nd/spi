const Status = require('../models/statusModel')
const ErrCode = require('../models/errCodeModel')

const getStatus = async(req, res, next) => {
	try {
		const listStatus = await Status.find({})
        return res.status(200).json({listStatus})
        
	}catch(err) {
		next(err)
	}
}

const confirmStatus = async(req, res, next) => {
	try {
		const {line,status} = req.params
		await Status.updateOne({line:line}, {status:status})
		if(status == 1){
			await ErrCode.updateMany({line:line}, {status:"COMPLETED"})
		}
        return res.status(200).json({message:"Confirm Success"})
        
	}catch(err) {
		next(err)
	}
}

module.exports = {
	getStatus, confirmStatus
}
