const router = require('express')()
const graphqlController = require('../controllers/graphql')

router.use('/', graphqlController)

module.exports = router
