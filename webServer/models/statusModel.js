//Require Mongoose
let mongoose = require('mongoose');

//Định nghĩa một schema
let Schema = mongoose.Schema;

let StatusCodeSchema = new Schema({
    line: String,
    model: String,
    status: { type: Number, default: '1'}
});

let LastStatus = mongoose.model('laststatus', StatusCodeSchema );
module.exports = LastStatus;