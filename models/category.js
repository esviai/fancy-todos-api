const mongoose = require('mongoose')
const Schema = mongoose.Schema

var categorySchema = new Schema ({
  name: {
    type: String,
    required: [true, '{PATH} should not be empty']
  }
})

var Category = mongoose.model('category', categorySchema)
module.exports = Category
