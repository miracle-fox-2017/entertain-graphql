const Series = require('../models/modelSeries')

const getDataSeries = (req, res) => {
  return new Promise((resolve, reject) => {
    Series.find()
    .then((dataSeries) => {
      resolve(dataSeries)
    })
    .catch((reason) => {
      reject(reason)
    })
  })
}

module.exports = {
  getDataSeries
}