const Task = require('../models/task')
const jwt = require('jsonwebtoken')

var creatorAuth = ((req, res, next) => {
  let token = req.headers.token
  if (token) {
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    if(decoded) {
      Task.findById(req.params.id, (err, task) => {
        console.log(task)
        if(task.user == decoded.id) {
          next()
        }
        else {
          res.send({errors: `You are not authorized`})
        }
      })
    }
    else {
      res.send({errors: `You are not signed in`})
    }
  }
  else {
    res.send({errors: `You are not signed in`})
  }
})

var authentication = ((req, res, next) => {
  let token = req.headers.token
  if(token) {
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    decoded ? next() : res.send({errors: `You are not signed in`})
  }
  else {
    res.send({errors: `You are not signed in`})
  }
})

var adminAuth = ((req, res, next) => {
  let token = req.headers.token
  if(token) {
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    if (decoded) {
      decoded.role === 'admin' ? next() : res.send({errors: `You are not authorized`})
    }
    else {
      res.send({errors: `You are not signed in`})
    }
  }
  else {
    res.send({errors: `You are not signed in`})
  }
})

module.exports = {
  authentication,
  creatorAuth,
  adminAuth
}
