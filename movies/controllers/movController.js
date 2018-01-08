const movie = require('../model/indexMovie')

const findMov = function(req,res){
console.log('oioi')
  movie.find({})
  .then(result=>{
    res.info="Movie Found Sucessfully"
    res.send(result)
  })
  .catch(err =>{
    console.error(err)
  })
}

const postMov = function(req,res){
  movie.create({
    name:req.body.name,
    title:req.body.title,
    overview:req.body.overview,
    popularity: req.body.popularity,
    poster_path: req.body.poster_path,
    tag:req.body.tag,
    status:req.body.status
  })
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    console.error(err)
  })
}

module.exports = {
  findMov,
  postMov
};