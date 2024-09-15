module.exports = (app)=>{

    const apiApp = require('express').Router()
  
    const ApiRoutes = require('./Routes')
    apiApp.use('/User', ApiRoutes)

    //Roter Post 

    const apiPostRotes = require('./PostRotes')
    apiApp.use('/Post', apiPostRotes)

    
  
    app.use('/api', apiApp)
      
  }