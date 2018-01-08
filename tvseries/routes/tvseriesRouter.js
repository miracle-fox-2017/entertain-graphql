const express = require('express')
const router = express.Router()
const tvSeriesCtrl = require('../controllers/tvSeriesController')

router.get('/', tvSeriesCtrl.getTV)
router.post('/', tvSeriesCtrl.postTV)
router.delete('/:id', tvSeriesCtrl.deleteTV)
router.put('/:id', tvSeriesCtrl.editTV)

module.exports = router
