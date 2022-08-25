const Router = require('express')
const route = new Router()

const collectionController = require('../controllers/collection.controller')
const checkUsetMiddleware = require('../middlewares/checkUser')

route.post('/create-collection',checkUsetMiddleware, collectionController.createCollection)
route.get('/get-collections',checkUsetMiddleware, collectionController.getCollections)

module.exports = route