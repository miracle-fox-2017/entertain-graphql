const Movie = require('../models/movies')
const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()

const getAllMovies = (req, res) => {
  Movie.find()
  .then(movies => {
    res.status(200).send({
      status: "OK",
      movies
    })
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const getAPIMovies = (req, res) => {
  axios.get('http://localhost:3000/orchestra')
  .then(data => {
    client.setex('entertain', 30, JSON.stringify(data))
  })
}

const postMovies = (req, res) => {
  let movie = new Movie ({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    status: req.body.status,
    popularity: req.body.popularity,
    tag: req.body.tag
  })
  movie.save()
  .then(newMovie => {
    res.status(200).send({
      status: "New Movie",
      newMovie
    })
    getAPIMovies()
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const updateMovie = (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      status: req.body.status,
      popularity: req.body.popularity,
      tag: req.body.tag
    }
  }, {new: true})
  .then(update => {
    res.status(200).send({
      status: "updated",
      update
    })
    getAPIMovies()
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const removeMovie = (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(remove => {
      res.status(200).send({
        status: "Remove",
        remove
      })
      getAPIMovies()
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

module.exports = {
  getAllMovies,
  postMovies,
  updateMovie,
  removeMovie
};