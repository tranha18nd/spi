const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name:{
		type:String
	},
	user:{
		type:String
	},
	pass:{
		type:String
	},
	decks: [{
		type: Schema.Types.ObjectId,
		ref:'Deck'
	}]
})

const User = mongoose.model('users', UserSchema)
module.exports = User