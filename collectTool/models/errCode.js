//Require Mongoose
let mongoose = require('mongoose');

//Định nghĩa một schema
let Schema = mongoose.Schema;

let ErrCodeSchema = new Schema({
    barCode: String,
    type: String,
    model: String,
    line: String,
    errtype: String,
    status: { type: String, default: 'PENDING' },
    updateTime: Date
});

let ErrCode = mongoose.model('errcode', ErrCodeSchema );
module.exports = ErrCode;