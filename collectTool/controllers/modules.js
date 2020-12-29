const fs = require('fs');
const fse = require('fs-extra');

const BarCode = require('../models/barCode.js')
const ErrCode = require('../models/errCode.js')
const LastStatus = require('../models/lastStatus.js')

const io = require('socket.io')({
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
  io.listen(8888);

let rFile = function (file) { 
    return new Promise(function(resolve,reject){
        fs.readFile(file, 'utf8', function(err, datas) {
            if(err){
                reject(err)
            } else {
                resolve(datas)
            }
        })
    })
}

let rFolder = function(folderOld){
    var folders = fs.readdirSync(folderOld);
    let newFolders = folders.map(folder=>{
        return folderOld+"/"+folder
    })
    return newFolders
}

let moveFile = function (src,dest) {   
    fse.move(src, dest)
        .catch(err => {
            console.error("ERR Move File" +err)
        })
}

let dataProcess = function (barCode, line, model, type){
    return new Promise(function(resolve,reject){
        if(type == "B"){
            // so sánh model
            let data = {
                barCode : barCode,
                line : line,
                model : model,
                type : type,
                updateTime : new Date()
            }
            BarCode.create(data, (err,result)=>{
                if (err){
                    reject("ERR ADDING:"+ err)
                }else {
                    resolve(".")
                }
            })
        } else {
            BarCode.findOne({barCode:barCode,type:"B"}, (err, result)=>{
                if(err){
                    reject("ERR FINDING:"+ err)
                } else {
                    if(result === null){
                        resolve('!!!DANGER!!! - '+line+' : BARCODE HAS NOT BEEN RUN BOT FACE')
                        io.emit("collectTool", new Date())
                        let errType = 'NOBOT'
                        let errData = {
                            barCode : barCode,
                            line : line,
                            model : model,
                            type : type,
                            errtype : errType,
                            updateTime : new Date()
                        }
                        let statusData = {
                            line : line,
                            status: 3
                        }
                        let filter = {
                            line:line
                        }
                        ErrCode.create(errData, (err,result)=>{
                            if (err){
                                reject("ERR ADDING ErrCode:"+ err)
                            }else {
                                resolve(".")
                            }
                        })
                        LastStatus.update(filter,statusData, {
                            new: true,
                            upsert: true
                          },(err,result)=>{
                            if (err){
                                reject("ERR ADDING Status:"+ err)
                            }
                        })
                    } else {
                        // sửa thành update
                        // khi nào confirm thỳ xóa errCode 
                        // khi nào đủ cặp thỳ update barcode

                        BarCode.deleteMany({ barCode: barCode }, (err,result)=>{
                            if(err){
                                reject("ERR DELETING")
                            }else {
                                resolve(".")
                            }
                        })
                    }
                }
            })
        }
    })
}

let fileProcess = async function(dataFile,line) { 
    let modelPatten = /szModelName = .+/g
    let codePatten = /szBarcode = .+/g
    let model =dataFile.match(modelPatten).toString()
    let modelName =  model.slice(18)
    let posType = modelName.search("_")
    let type = modelName.slice(posType+1,posType+2)
    let codes = dataFile.match(codePatten).toString()
    let listCode = codes.slice(12).split(",")
    for (let i = 0; i < listCode.length; i++) {
        let barCode = listCode[i];
        // console.log(barCode)
        await dataProcess(barCode, line, modelName, type)
            .then(e=>{
                console.log(e)
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

module.exports.mainProcess = function (file){
    rFile(file)
        .then((data)=>{
            let configDatas = JSON.parse(data)
            if(configDatas.length > 0){
                configDatas.forEach((configLine,key) => {
                let line = "Line"+configLine.LINE
                // drt 
                // let dirLine = configLine.IP+"\\"+process.env.URL_FOLDER_OLD+"\\"+line
                // test
                let dirLine = process.env.URL_FOLDER_OLD+"/"+line
                let dirLanes = rFolder(dirLine)
                
                if(dirLanes.length >0){
                    dirLanes.forEach((dirLane,key) => {
                        let dirModels = rFolder(dirLane)
                        
                        if(dirModels.length >0){
                            dirModels.forEach((dirModle,key) => {
                                let dirFolders = rFolder(dirModle)
                                
                                if(dirFolders.length >0){
                                    dirFolders.forEach((dirFolder,key)=>{
                                        let dirFile = dirFolder+"/InspectionResult.txt"
                                        rFile(dirFile)
                                            .then((dataFile) =>{
                                                if(dataFile !== ''){
                                                    fileProcess(dataFile,line)
                                                }
                                                let dirFolderNew = dirFolder.replace(process.env.URL_FOLDER_OLD,process.env.URL_FOLDER_NEW)
                                                moveFile(dirFolder,dirFolderNew)
                                            })
                                            .catch(eFile=>{console.log(eFile)})
                                    })
                                }
                            })
                        }
                    })
                }
            })
            }
        })
        .catch(e=>{console.log(e)})
}
