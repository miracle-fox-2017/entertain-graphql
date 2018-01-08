const app = require('express')()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/entertainme', {
  useMongoClient: true,
});

const graphql = require('./routes/graphql.js')

app.use('/graphql', graphql);

app.listen(4000, () => {
  console.log('running server on port 4000')
})