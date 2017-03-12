#!node

'use strict'

require('dotenv').config()

var app = require('./app')

app.listen(3000, function() {
  console.log('app listening on port 3000')
})

