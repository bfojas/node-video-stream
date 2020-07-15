const router = require('express').Router()
const videoController = require('../controllers/videoControllers')

router.get('/:file', videoController.streamVideo)

module.exports = router