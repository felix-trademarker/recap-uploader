var Model = require('./../models/_model')
var path = require('path')
const { toInteger } = require('lodash'); 
const fs = require('fs')

var rpoContents = new Model("contents")

exports.uploadAudio = async function(req, res, next) {
    
    console.log("current path", __dirname);
    var file = req.files.file
    var extName = path.extname(file.name)
    // var filename = toInteger(req.app.locals.moment().format('YYMMDDHHMMSS')) + extName;
    var filename = toInteger(req.app.locals.moment().format('YYMMDDHHMMSS')) + extName;
    filename = file.name.toLowerCase()
    uploadPath = __dirname + '/../public/recap-audio/uploads/'+filename;

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

exports.getLesson = async function(req, res, next) {

    let lessons = await rpoContents.find(req.params.id)

    lessons = lessons && lessons.length > 0 ? lessons[0] : null

    res.json({results:lessons})
    
  
}

