const Joi = require('@hapi/joi')
const validateParam = (schema, name) => {
	return (req, res, next) => {
        const validatorResult = schema.validate({param:req.params[name]})
		if(validatorResult.error){
			return res.status(400).json({message:"Can not find this line"})
		} else {
			if(!req.value) req.value = {}
			if(!req.value['params']) req.value.params = {}
			req.value.params[name] = req.params[name]
			next()
		}
	}
}

const validateBody = (schema, name) => {
	return (req, res, next) => {
		const validatorResult = schema.validate(req.body)
		if(validatorResult.error){
			return res.status(400).json({message:"Validate Body"})
		} else {
			if(!req.value) req.value = {}
			if(!req.value['params']) req.value.params = {}
			//req.value.params[name] = req.params[name]
			req.value.body = validatorResult.value
			next()
		}
	}
}

const schemas = {
	idSchema: Joi.object().keys({
		param: Joi.string().regex(/^[0-9a-zA-Z]/).required()
	}),

	userSchema: Joi.object().keys({
		name: Joi.string().min(2).max(7).required(),
		pass: Joi.string().min(6).required(),
		manv: Joi.string().min(6).required()
	})
}

module.exports = {
	validateParam, schemas, validateBody
}