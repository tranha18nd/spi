// require('dotenv').config()
// const moduleApp = require('./modules')
// // const z = require('./package.js')
// let fs = require('fs');
// // z.t1()
// moduleApp.rFile('config.txt')
//     .then((data)=>{
//         let configDatas = JSON.parse(data)
//         configDatas.forEach((configLine,key) => {
//             let line = "Line"+configLine.LINE
//             let dirLine = process.env.URL_FOLDER_OLD+'/'+line
//             let dirLanes = moduleApp.rFolder(dirLine)
            
//             if(dirLanes.length >0){
//                 dirLanes.forEach((dirLane,key) => {
//                     let dirModels = moduleApp.rFolder(dirLane)
                    
//                     if(dirModels.length >0){
//                         dirModels.forEach((dirModle,key) => {
//                             let dirFolders = moduleApp.rFolder(dirModle)
                            
//                             if(dirFolders.length >0){
//                                 dirFolders.forEach((dirFolder,key)=>{
//                                     let dirFiles = moduleApp.rFolder(dirFolder)
//                                     let modelPatten = /szModelName = .+/g
//                                     let codePatten = /szBarcode = .+/g

//                                     if(dirFiles.length >0){
//                                         dirFiles.forEach((dirFile,key)=>{
//                                             moduleApp.rFile(dirFile)
//                                                 .then((dataFile) =>{
//                                                     if(dataFile !== ''){
//                                                         let item = {}
//                                                         dataFile.match(modelPatten).forEach((model,key)=>{
//                                                             let modelName =  model.slice(18)
//                                                             let posType = modelName.search("_")
//                                                             let type = modelName.slice(posType+1,posType+2)
//                                                             item.type = type
//                                                             item.model = modelName
//                                                         })
//                                                         dataFile.match(codePatten).forEach((codes,key)=>{
//                                                             let listCode = codes.slice(12).split(",")
//                                                             item.listCode = listCode
//                                                         })
//                                                         console.log(JSON.stringify(item))
//                                                     }
//                                                 })
//                                                 .catch(eFile=>{console.log(eFile)})
//                                         })
//                                     } 
//                                 })
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     })
//     .catch(eFile=>{console.log(e)})
// const io = require('socket.io')();
// io.on('connection', socket => {
//     io.on("Line01", function(data){
//         console.log(data);
//     })
// })
const io = require('socket.io')();

io.listen(8888,()=>{
  console.log("Socket on 8888")
});