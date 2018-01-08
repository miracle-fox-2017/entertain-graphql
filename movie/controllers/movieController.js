const Movie = require('../models/movieModel')
const mongoose = require('mongoose')
const redis = require("redis");
const client = redis.createClient();
const axios = require('axios');

const getMovie = (req,res) => {
  Movie.find({})
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const getAPIMovie = (req, res) => {
  axios.get(`http://localhost:3000/film`)
  .then(data => {
    client.setex('listfilmbro', 20, JSON.stringify(data))
  })
};

const postMovie = (req,res) => {
  Movie.create({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag,
    status: req.body.status
  })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const editMovie = (req,res) => {
  Movie.update({
    _id:req.params.id
  },{
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag
  })
  .then((data)=>{
    res.status(200).send(data)
    getAPIMovie()
  })
  .catch((err)=>{
    res.status(500).send(err)
  })
}

const deleteMovie = (req,res) => {
  Movie.remove({
    _id:req.params.id
  })
  .then((data)=>{
    res.status(200).send(data)
    getAPIMovie()
  })
  .catch((err)=>{
    res.status(500).send(err)
  })
}


module.exports = {
  getMovie,
  postMovie,
  editMovie,
  deleteMovie
}
