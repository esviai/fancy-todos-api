"use strict"

const express = require("express")
const bodyParser = require('body-parser')
const dotenvConfig = require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOLAB_URI)
const cors = require('cors')
const port = process.env.PORT || 3000

const index = require('./routes/index')
const admin = require('./routes/admin')
const tasks = require('./routes/tasks')

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', index)
app.use('/dashboard', admin)
app.use ('/tasks/', tasks)

app.listen(port)
