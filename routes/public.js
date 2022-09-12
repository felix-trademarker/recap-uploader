var express = require('express');


const publicController = require('../controllers/publicController')
const apiController = require('../controllers/apiController')


var router = express.Router();

// TESTERS ============================
// ====================================

router.get([
    '/',
    '/audio-recap/'
],publicController.index);

router.get([
    '/login',
],publicController.login);

router.get([
    '/audio-recap/add-audio'
],publicController.addAudio);

router.post([
    '/audio-recap/add-audio-submit'
],publicController.addAudioSubmit);

router.get([
    '/audio-recap/edit/:id'
],publicController.editAudio);

router.post([
    '/audio-recap/edit-audio-submit'
],publicController.editAudioSubmit);



// ================ API ===============
// ====================================
router.post([
    '/audio-recap/api/v1/upload'
],apiController.uploadAudio);

router.post([
    '/audio-recap/api/v1/upload-zip'
],apiController.uploadZip);

router.get([
    '/audio-recap/api/v1/get/:id'
],apiController.getLesson);





module.exports = router;
