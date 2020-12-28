require('dotenv').config()
const moduleApp = require('./controllers/modules')
const mongoose = require('mongoose');
const io = require('socket.io')();
io.listen(8888);

let mongoDB = 'mongodb://localhost/sAOIData';
mongoose.connect(mongoDB, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
//Ép Mongoose sử dụng thư viện promise toàn cục  
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected. Program start !!!")
});

moduleApp.mainProcess('./config.txt')
setInterval(()=>{
    moduleApp.mainProcess('./config.txt')
}, 15000)