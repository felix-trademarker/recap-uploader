var Model = require('./../models/_model')
const AWS = require('aws-sdk');
var rpoContents = new Model("lessons")
var rpoRecaps = new Model("recaps")

exports.login = async function(req, res, next) {

    let lessons = await rpoContents.get()

    // console.log(lessons);
    res.render('login', {
        layout: 'layout/public-layout', 
        title: '',
        description: '',
        keywords: '',
        lessons: lessons

    });
    
  
}

exports.index = async function(req, res, next) {

    let recaps = await rpoRecaps.get()

    // TEST SMS START >>>>>>
    const path = require ("path");
    const fs = require ("fs");
    const fetch = require ("node-fetch")
    

    // let dest = "+886900328388", message="this is a test message from telnyx";
    // // function sendSMS (dest, message) {
    //   const url = 'https://sms.telnyx.com/messages';
    //   var apiKey, profile, profileSecret;
    
    //   // second first profile: 
    //   profile = "ddd9a7c4-c3fc-43e8-a0dd-e5bb462d38e4";
    //   profileSecret = "erxjRp55M5XB3MGfxpxmz9yy";
    //   apiKey = "KEY01808D0DBDBA586F1FFB803D2D7F0E24_0ezcsARVzAE9DEgfEmnRdK";
    
    //   let body = {
    //     src: "19176942023",
    //     dst: dest,
    //     is_mms: false,
    //     body: message,
    //     original_body: message,
    // //    "delivery_status_webhook_url": "https://api.bigfoot.com/webhook/sms"
    //   }
    
    
    //   fetch (url, {
    //       headers: { 'Accept': 'application/json', 'X-Profile-Secret': profileSecret,
    //         'Content-Type': 'application/json' }, 
    //       method: "POST", 
    //       body: JSON.stringify (body) } 
    //   )
    //   .catch (function (res) { console.log (res); })
    //   .then (result => result.text ())
    //   .then (answer => {
    //      console.log ("Response from SMS API:")
    //      console.log (answer);
    //      if (answer.success == false) { 
    //       let message = "BF: Problem sending SMS";
    //       if (typeof answer.message == "string") message = answer.message;
    //       sa.warning ("baidu/download/sms", message);
    //      }
    //   });

    
// TEST SMS END <<<<<<


    // console.log(lessons);
    res.render('index', {
        layout: 'layout/public-layout', 
        title: '',
        description: '',
        keywords: '',
        recaps: recaps

    });
    
  
}

exports.addAudio = async function(req, res, next) {

    // console.log(req.app.locals.moment().format());
    res.render('add-audio', {
        layout: 'layout/public-layout', 
        title: '',
        description: '',
        keywords: '',

    });
    
}

exports.editAudio = async function(req, res, next) {

    console.log(req.params);
    let lessons = await rpoRecaps.find(req.params.id)

    res.render('edit-audio', {
        layout: 'layout/public-layout', 
        title: '',
        description: '',
        keywords: '',
        lessons: lessons ? lessons[0] : null

    });
    
}

exports.addAudioSubmit = async function(req, res, next) {

    // let lessons = await rpoRecaps.findQuery({ lessonNumber: req.body.lessonNumber })

    // if ( lessons && lessons.length > 0 ) {
    //     lessons = lessons[0]

    //     lessons.recap = req.body
    //     // lessons.recap.fileObj = req.files.fileupload
    //     lessons.recap.audioFilePath = "/recap-uploader/uploads/"+lessons.recap.fileupload
    //     // delete lessons.recap.fileupload

    //     rpoRecaps.update(lessons._id, {recap: lessons.recap})

    //     console.log('update');

    //     res.redirect("/audio-uploader")
    // }

    console.log('saving');

    let data = req.body 
    data.audioFilePath = "/recap-uploader/uploads/"+(data.fileName)

    data.updatedAt = req.app.locals.moment().format()
    await rpoRecaps.upsert({lessonNumber:data.lessonNumber}, data)

    res.redirect("/recap-uploader")
}

exports.editAudioSubmit = async function(req, res, next) {

    console.log('saving');

    let data = req.body 
    data.audioFilePath = "/recap-uploader/uploads/"+(data.fileName)
    data.updatedAt = req.app.locals.moment().format()
    await rpoRecaps.upsert({lessonNumber:data.lessonNumber}, data)

    res.redirect("/recap-uploader")
}


// fetch file from s3
exports.fetchPublicImages = async function(req, res, next) {

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    let s3Images = new AWS.S3();
  
  
    let key = req.params[0]
    console.log(key);
    // key = key.replace("html/", "");
    // console.log('res',key);
    var params = {Bucket: process.env.AWS_BUCKET, Key: key};
  
    try{
  
      const data = await s3Images.getObject(params).promise();
  
      console.log("this",data);
      res.contentType(data.ContentType);
      res.send(data.Body)
  
    } catch (e) {
      console.log(e);
      res.send("Sorry, File not found");
    }
  
  }