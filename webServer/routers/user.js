const express = require('express')
// const {validateParam, schemas, validateBody} = require('../helpers/routeHelpers')
// const router = require("express").Router();
const router = express.Router()
const userController = require('../controllers/userController')
// router.route('/')
// 	.get(statusController.getStatus)
router.route('/login/')
	.post(userController.login)
module.exports = router