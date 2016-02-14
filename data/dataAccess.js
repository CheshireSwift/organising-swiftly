'use strict'

var neo4j = require('neo4j')
const DB_USER = process.env.NEO4J_USER
const DB_PASS = process.env.NEO4J_PASS
const DB_HOST = process.env.NEO4J_HOST
var db = new neo4j.GraphDatabase(`http://${DB_USER}:${DB_PASS}@${DB_HOST}`)

var Promise = require('bluebird')
Promise.promisifyAll(db)

exports.retrieveEntries = function() {
  return db.cypherAsync({ query: 'MATCH (root:Root)-[rels:CONTAINS*]-(entries) RETURN root, rels, entries' })
}

