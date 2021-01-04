const express = require('express')
const {validateParam, schemas, validateBody} = require('../helpers/statusHelpers')

const router = express.Router()
const statusController = require('../controllers/statusController')

router.route('/')
	.get(statusController.getStatus)
router.route('/confirm/:line.:status')
	.get(validateParam(schemas.idSchema, 'line'),statusController.confirmStatus)
module.exports = router