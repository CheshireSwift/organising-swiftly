'use strict'

var _ = require('lodash')

var dataAccess = require('./dataAccess')

function retrieveEntries() {
  return dataAccess.retrieveEntries().then(transformEntries)
}

function transformEntries(rows) {
  if (_.isEmpty(rows)) {
    return {}
  }

  // extract relevant info
  var rootNode = _.first(rows).root
  var nodesById = _(rows)
    .pluck('entries')
    .indexBy('_id')
    .merge({ [rootNode._id]: rootNode })
    .value()
  var relationshipsByStartNode = _(rows)
    .pluck('rels')
    .flatten()
    .uniq('_id')
    .groupBy('_fromId')
    .value()
  
  // build output
  function childrenIdsOfNode(id) {
    return _(relationshipsByStartNode[id]).pluck('_toId')
  }

  function formatNode(node) {
    var children = childrenIdsOfNode(node._id).map(id => formatNode(nodesById[id]))
    return _.merge({},
      { ID: node._id },
      node.properties,
      { children: children.isEmpty() ? undefined : children.value() }
    )
  }

  return formatNode(rootNode).children
}

module.exports = {
  retrieveEntries
}
