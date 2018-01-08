const express = require('express')
const router = express.Router()
const movieCtrl = require('../controllers/movieController')

router.get('/', movieCtrl.getMovie)
router.post('/', movieCtrl.postMovie)
router.delete('/:id', movieCtrl.deleteMovie)
router.put('/:id', movieCtrl.editMovie)

module.exports = router
