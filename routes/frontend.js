'use strict'

var express = require('express');
var router = express.Router();

var dataTransform = require('../data/dataTransform')

router.get('/nodes', function(req, res) {
  dataTransform.retrieveEntries().then(entries => res.json(entries))
})

module.exports = router
