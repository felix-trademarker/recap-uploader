var express = require('express');


const publicController = require('../controllers/publicController')
const apiController = require('../controllers/apiController')


var router = express.Router();

// TESTERS ============================
// ====================================

router.get([
    '/'
],publicController.index);

router.get([
    '/login'
],publicController.login);

router.get([
    '/add-audio'
],publicController.addAudio);

router.post([
    '/add-audio-submit'
],publicController.addAudioSubmit);

router.get([
    '/edit/:id'
],publicController.editAudio);

router.post([
    '/edit-audio-submit'
],publicController.addAudioSubmit);



// ================ API ===============
// ====================================
router.post([
    '/api/v1/upload'
],apiController.uploadAudio);

router.post([
    '/api/v1/upload-zip'
],apiController.uploadZip);

router.get([
    '/api/v1/get/:id'
],apiController.getLesson);


// ================ S3 ===============
// ====================================
router.get('/s3/uploads/*', publicController.fetchPublicImages);




module.exports = router;
