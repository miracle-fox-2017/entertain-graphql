const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

/* GET users listing. */
router.get('/', movieController.findAll);
router.post('/create', movieController.create);


module.exports = router;