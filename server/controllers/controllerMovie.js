const Movies = require('../models/modelMovie')

const getDataMovie = (req, res) => {
  return new Promise((resolve, reject) => {
    Movies.find()
    .then((dataMovies) => {
      resolve(dataMovies)
    })
    .catch((reason) => {
      reject(reason)
    })
  })
}
const saveMovie = (req, res) => {
  return new Promise((resolve, reject) => {
    Movies(req).save(function (err) {
      if (err) throw err
      resolve()
      console.log('Moviee Input')
    })
  })
}
const delMovie = (req, res) => {
  return new Promise((resolve, reject) => {
    Movies.findByIdAndRemove(req._id, function(err) {
      if (err) throw err;
      resolve()
      // we have deleted the user
      console.log('Movie deleted!');
    });
  })
}
const editMovie = (req, res) => {
  return new Promise((resolve, reject) => {
    let obj = {
      title: req.title,
      overview: req.overview,
      poster_path: req.poster_path,
      popularity: req.popularity
    }
    Movies.findByIdAndUpdate(req._id, req, function(err, user) {
      if (err) throw err;
      resolve()
      // we have the updated user returned to us
      console.log(user)
    });
  })
}

module.exports = {
  getDataMovie,
  saveMovie,
  delMovie,
  editMovie
}