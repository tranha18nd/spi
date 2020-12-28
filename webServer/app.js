const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
// module alow perfomance function
app.use(logger('dev'))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// connect mongodb
let mongoDB = 'mongodb://localhost/sAOIData';
mongoose.connect(mongoDB, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .catch((error) => console.error(`Connect to db error ${error}`))
    
const userRouter = require('./routers/user')
const statusRouter = require('./routers/status')
const setupRouter = require('./routers/setup')

app.use('/users', userRouter)
app.use('/status', statusRouter)
app.use('/setup', setupRouter)

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcome to WebServer API S-AOI'
    })
})
// define err/ catch err 404
app.use((req, res, next)=> {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
// hanlder err
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    res.status(status).json({
        error:{
            message: error.message
        }
    })
})

const port = app.get('port') || 3001
app.listen(port, () => console.log(`WebServer to start on port ${port}`))