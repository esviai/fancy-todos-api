const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

var taskSchema = new Schema ({
  todo: {
    type: String,
    required: [true, '{PATH} should not be empty']
  },
  done: {
    type: Boolean,
    required: [true, '{PATH} should not be empty']
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  categories: [String]
})

var Task = mongoose.model('task', taskSchema)
module.exports = Task
