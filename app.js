'use strict'

var express = require('express')
var app = express()

app.use('/api', require('./routes/api'))

module.exports = app
