const movie = require('../controllers/movController')
const express = require('express')
const router = express.Router()

router.get('/',movie.findMov)

router.post('/',movie.postMov)

module.exports = router;