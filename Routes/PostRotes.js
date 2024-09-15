const apiPostRotes = require('express').Router()

const reqBody = require('../middleware/reqBody')

const controller  = require('../Controllers/Post')

apiPostRotes.post('/create'),controller.createPost

apiPostRotes.get('/getall', controller.getAll)

module.exports  = apiPostRotes;
