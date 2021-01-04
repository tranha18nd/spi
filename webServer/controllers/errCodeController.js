const ErrCode = require('../models/errCodeModel')

const getErrCode = async(req, res, next) => {
	try {
		const {line} = req.params
		const listErrCode = await ErrCode.find({line:line})
        return res.status(200).json({listErrCode})
        
	}catch(err) {
		next(err)
	}
}


module.exports = {
	getErrCode
}
