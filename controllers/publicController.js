var Model = require('./../models/_model')

var rpoContents = new Model("contents")

exports.index = async function(req, res, next) {

    let lessons = await rpoContents.get()

    // console.log(lessons);
    res.render('index', {
        layout: 'layout/public-layout', 
        title: '',
        description: '',
        keywords: '',
        lessons: lessons

    });
    
  
}

exports.addAudio = async function(req, res, next) {

    res.render('add-audio', {
        layout: 'layout/public-layout', 
        title: '',
        description: '',
        keywords: '',

    });
    
}

exports.editAudio = async function(req, res, next) {

    console.log(req.params);
    let lessons = await rpoContents.find(req.params.id)

    res.render('edit-audio', {
        layout: 'layout/public-layout', 
        title: '',
        description: '',
        keywords: '',
        lessons: lessons ? lessons[0] : null

    });
    
}

exports.addAudioSubmit = async function(req, res, next) {

    let lessons = await rpoContents.findQuery({ v3_id: req.body.lessonNumber })

    if ( lessons && lessons.length > 0 ) {
        lessons = lessons[0]

        lessons.recap = req.body
        // lessons.recap.fileObj = req.files.fileupload
        lessons.recap.audioFilePath = "/recap-audio/uploads/"+lessons.recap.fileupload
        // delete lessons.recap.fileupload

        rpoContents.update(lessons._id, {recap: lessons.recap})

        console.log('update');

        res.redirect("/audio-recap")
    }
}

exports.editAudioSubmit = async function(req, res, next) {

    let lessons = await rpoContents.find(req.body.lessonId)

    // console.log(req.body)
    // return;
    if ( lessons && lessons.length > 0 ) {
        lessons = lessons[0]
        let fileupload=''

        if (req.body.fileupload) {
            fileupload = req.body.fileupload
        } else {
            fileupload = lessons.recap.fileupload
        }

        lessons.recap = req.body
        lessons.recap.fileupload = fileupload
        lessons.recap.audioFilePath = "/recap-audio/uploads/"+lessons.recap.fileupload

        rpoContents.update(lessons._id, {recap: lessons.recap})

        console.log('update');

        res.redirect("/audio-recap")
    }
}
