'use strict'

var express = require('express')
var app = express()

app.use('/', require('./routes/frontend'))
app.use('/api', require('./routes/api'))
app.use(express.static('public'))

module.exports = app
