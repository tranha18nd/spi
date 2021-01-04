const express = require('express')
const {validateParam, schemas, validateBody} = require('../helpers/errCodeHelpers')

const router = express.Router()
const errCodeController = require('../controllers/errCodeController')

// router.route('/')
// 	.get(statusController.getStatus)
router.route('/detail/:line')
	.get(validateParam(schemas.idSchema, 'line'),errCodeController.getErrCode)
module.exports = router