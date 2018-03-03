# entertain-graphql

mutation{
  addMovie(input:{
    title: "Radnom",
    overview: "DeleteMe"
  }) {
    _id
    title
    overview
  }
}

mutation{
  deleteMovie(input:{
    id: "5a537071dabe1862bbb27988"
  })
   {
    _id
    title
    overview
  }
}

query{
  movie {
    _id
    title
    overview
  }
}