const Status = require('../models/statusModel')

const getStatus = async(req, res, next) => {
	try {
		const listStatus = await Status.find({})
        return res.status(200).json({listStatus})
        
	}catch(err) {
		next(err)
	}
}


module.exports = {
	getStatus
}
