'use strict'

var express = require('express')
var app = express()

var dataTransform = require('./data/dataTransform')

app.get('/nodes', function(req, res) {
  dataTransform.retrieveEntries().then(entries => res.json(entries))
})

module.exports = app

