const express = require('express');
const router = express.Router();
const movies = require('../controllers/movies')

router.get('/', movies.getAllMovies)
router.post('/', movies.postMovies)
router.put('/:id', movies.updateMovie)
router.delete('/:id', movies.removeMovie)

module.exports = router;