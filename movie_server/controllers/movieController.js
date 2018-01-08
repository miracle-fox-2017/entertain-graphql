const movieModel = require('../models/movieModel');

const create = (req, res) => {
	if (req.body.title !== null && typeof req.body.title !== 'undefined') {
		let movie = new movieModel({
			title: req.body.title || null,
			overview: req.body.overview || '',
		})

		movie.save()
			.then(newMovie => {
				res.status(200).send({ status: newMovie, message: 'Movie Created' });

			}).catch(err => res.status(500).send({ message: 'Something wrong', error: err.message }));

	} else {
		res.status(500).send({ message: 'Fill the data' });
	}
}

const findAll = (req, res) => {
	movieModel.find({})
	.then(movies => {
		res.status(200).send({
			info: 'movie found successfully',
			data: movies
		})
		
	}).catch(err => res.status(500).send({message: err.message}));
}


module.exports = {
	findAll,
	create
}