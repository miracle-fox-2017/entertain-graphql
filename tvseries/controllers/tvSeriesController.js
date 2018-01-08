const TV = require('../models/tvSeriesModel')
const mongoose = require('mongoose')
const redis = require("redis");
const client = redis.createClient();
const axios = require('axios');

const getTV = (req,res) => {
  TV.find({})
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}


const getAPItvseries = (req, res) => {
  axios.get(`http://localhost:3000/film`)
  .then(data => {
    client.setex('listfilmbro', 20, JSON.stringify(data))
  })
};

const postTV = (req,res) => {
  TV.create({
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

const editTV = (req,res) => {
  TV.update({
    _id:req.params.id
  },{
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag,
    status: req.body.status
  })
  .then((data)=>{
    res.send(data)
    getAPItvseries()
  })
  .catch((err)=>{
    res.send(err)
  })
}

const deleteTV = (req,res) => {
  TV.remove({
    _id:req.params.id
  })
  .then(data =>{
    res.status(200).send(data)
    getAPItvseries()
  })
  .catch((err)=>{
    res.status(500).send(err)
  })
}

module.exports = {
  getTV,
  postTV,
  editTV,
  deleteTV
}
