var Model = require('./../models/_model')
var path = require('path')
const { toInteger } = require('lodash'); 
const fs = require('fs')
const extract = require('extract-zip')


var rpoRecap = new Model("recaps")
var helpers = require('../helpers')

exports.uploadAudio = async function(req, res, next) {
    
    console.log("current path", __dirname);
    var file = req.files.file
    var extName = path.extname(file.name)
    // var filename = toInteger(req.app.locals.moment().format('YYMMDDHHMMSS')) + extName;
    var filename = toInteger(req.app.locals.moment().format('YYMMDDHHMMSS')) + extName;
    filename = file.name.toLowerCase()
    uploadPath = __dirname + '/../public/recap-uploader/uploads/'+filename;

    if (fs.existsSync(uploadPath)) {
        //file exists
        let resData = {
            status: false,
            message: "File Already Exists",
            filename : filename
        }

        res.json({results:resData})
    } else {

        file.mv(uploadPath, function(err) {
            if (err) 
            console.log(err);
        });

        let resData = {
            status: true,
            message: "uploaded successfully",
            filename : filename
        }
    
        res.json({results:resData})
    
    }

    
}

exports.uploadZip = async function(req, res, next) {
    
    // console.log("current path", __dirname);
    var file = req.files.file
    var extName = path.extname(file.name)
    // var filename = toInteger(req.app.locals.moment().format('YYMMDDHHMMSS')) + extName;
    var zipFolder = toInteger(req.app.locals.moment().format('YYMMDDHHMMSS'));
    var filename = file.name.toLowerCase()
    let zipUrl = __dirname + '/../public/recap-uploader/uploads/'+zipFolder
    fs.mkdirSync(zipUrl);
    uploadPath = zipUrl +'/'+filename;

    // get full folder
    let zipFolderPath = uploadPath.replace(".zip","")
    console.log('uploading', file);

    if (fs.existsSync(uploadPath)) {
        //file exists
        let resData = {
            status: false,
            message: "File Already Exists",
            filename : filename
        }

        res.json({results:resData})
    } else {

        let this_ = this;
        let testret = await new Promise(async function(resolve, reject) {
            await file.mv(uploadPath, async function(err) {
                let test = []

                if (err)
                console.log(err);

                console.log("extracted");
                try{
                    await extract(uploadPath, { dir: zipUrl })
                    console.log("done extract");

                    // find json file

                    if (!fs.existsSync(zipFolderPath)){
                        console.log("no dir ",zipFolderPath);
                        return;
                    }

                    // console.log(helpers.getFiles(zipFolder,'.json'));

                    let jsonFiles = helpers.getFiles(zipFolderPath,'.json')

                    for (let i=0; i < jsonFiles.length; i++) {
                        let jsonFile = require('./../public/recap-uploader/uploads/'+zipFolder+'/'+filename.replace(".zip","") + "/" + jsonFiles[i])
                        console.log("j file", jsonFile);
                        
                        // fetch all entries in JSON
                        for (let j=0; j < jsonFile.length; j++) {
                            let jFile = jsonFile[j]
                            jFile.updatedAt = req.app.locals.moment().format()
                            await rpoRecap.upsert({lessonNumber: jFile.lessonNumber }, jFile)
                        }

                        test.push(jsonFile)
                    }

                    let wavFiles = helpers.getFiles(zipFolderPath,'.wav')
                    let testLoc;
                    for (let i=0; i < wavFiles.length; i++) {
                        let imageURL = zipFolderPath + "/" + wavFiles[i]
                        console.log("wav file", imageURL);
                        // stop here CREATE LIST OF WAV TO UPLOAD TO S3
                        // testLoc = await helpers.saveToS3(imageURL, wavFiles[i])
                        console.log(testLoc);
                    }

                    resolve(test)

                

                } catch(e) {
                    console.log('nag error ',e);
                }
            });

        })

        

        console.log("test", testret);
        
        // let testLoc = await this.saveToS3()


        let resData = {
            status: true,
            message: "uploaded successfully",
            records : testret[0]
        }
    
        res.json({results:resData})
    
    }

    
}

exports.getLesson = async function(req, res, next) {

    let lessons = await rpoRecap.find(req.params.id)

    lessons = lessons && lessons.length > 0 ? lessons[0] : null

    res.json({results:lessons})
    
  
}


