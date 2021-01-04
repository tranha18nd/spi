//Require Mongoose
let mongoose = require('mongoose');

//Định nghĩa một schema
let Schema = mongoose.Schema;

let BarCodeSchema = new Schema({
    barCode: String,
    type: String,
    model: String,
    line: String,
    status:{type:Number, default:1},
    updateTime: Date
});

let BarCode = mongoose.model('barcode', BarCodeSchema );
module.exports = BarCode;