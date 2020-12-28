const ErrCode = require('../models/errCodeModel')

const index = async(req, res, next) => {
	try {
		const users = await ErrCode.find({})
		return res.status(200).json({users})
	}catch(err) {
		next(err)
	}
}


module.exports = {
	index
}
