'use strict'

var express = require('express')
var app = express()

var apiRouter = require('./routes/api')

app.use('/api', apiRouter)

module.exports = app
