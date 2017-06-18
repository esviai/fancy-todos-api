const Task = require('../models/task')
const Category = require('../models/category')
const jwt = require('jsonwebtoken')

var create = ((req, res) => {
  let token = req.headers.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY)
  if (decoded) {
    //let categories = []
    //let inCats = req.body.categories.trim().split(',')
    //inCats.forEach(incat => {
    //  Category.findOne({name: incat}, (err, category) => {
    //    if (err) res.send(err)
    //    else {
    //      if(category !== null) {
    //        categories.push(category.id)
    //      }
    //      else {
    //        let newCategory = new Category ({
    //          name: incat
    //        })
    //        newCategory.save((err, createdCategory) => {
    //          categories.push(category.id)
    //        })
    //      }
    //    }
    //  })
    //})
    let newTask = new Task ({
      todo: req.body.todo,
      done: false,
      user: decoded.id,
      categories: req.body.categories.split(',').map(category => category.trim())
    })
    newTask.save((err, createdTask) => {
      res.send(err ? err : createdTask)
    })
  }
  else {
    res.send({errors: `You are not signed in`})
  }
})

var showAll = ((req,res) => {
  Task.find({}, null, {sort: {'done': -1}}, (err, tasks) => {
    res.send(err ? err : tasks)
  })
})

var showOne = ((req,res) => {
  let id = req.params.id
  Task.findById(id, (err, task) => {
    res.send(err ? err : task)
  })
})

var showByUser = ((req,res) => {
  let token = req.headers.token
  jwt.verify(token, process.env.SECRET_KEY, (err,decoded) => {
    if (decoded) {
      if(decoded.role === "admin") {
        let userId = req.params.userId
        Task.find({users:userId}, null, {sort: {'done': -1}}, (err,tasks) => {
          res.send(err ? err : tasks)
        })
      }
      else {
        Task.find({user:decoded.id}, (err,tasks) => {
          res.send(err ? err : tasks)
        })
      }
    }
    else res.send({errors: `Please signin/signup`})
  })
})

var destroy = ((req,res) => {
  let id = req.params.id
  Task.findByIdAndRemove(id, (err,task) => {
    res.send(err ? err : task)
  })
})

var update = ((req,res) => {
  let id = req.params.id
  Task.findById(id, (err, task) => {
    task = task
    task.todo = req.body.todo || task.todo
    if(req.body.categories) task.categories = req.body.categories.split(',').map(category => category.trim())
    if(req.body.done !== undefined) task.done = req.body.done
    task.save((err,updatedTasks) => {
      res.send(err ? err : updatedTasks)
    })
  })
})

module.exports = {
  create,
  showOne,
  showAll,
  showByUser,
  destroy,
  update
}
