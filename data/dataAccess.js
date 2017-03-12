'use strict'

var neo4j = require('neo4j-driver').v1
const DB_HOST = process.env.NEO4J_URL
const DB_USER = process.env.NEO4J_USER
const DB_PASS = process.env.NEO4J_PW
var driver = neo4j.driver(`bolt://${DB_HOST}`, neo4j.auth.basic(DB_USER || 'neo4j', DB_PASS))
var session = driver.session()

exports.retrieveEntries = function() {
  return session.run('MATCH (root:Root)-[rels:CONTAINS*]-(entries:Entry) RETURN root, rels, entries')
}
