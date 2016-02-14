var expect = require('chai').expect,
    request = require('supertest'),
    proxyquire = require('proxyquire');

const TEST_NODES_DATA = [{
  "ID": 0,
  "text": "Update repo",
  "completed": false,
  "children": [
    {
      "ID": 1,
      "text": "Commit changes",
      "completed": true
    }, {
      "ID": 2,
      "text": "Push to origin",
      "completed": false
    }
  ]
}]

function fakePromise(f) {
  return {
    then: cb => f(cb)
  }
}

var dataStub = {
  retrieveEntries: () => fakePromise(cb => cb(TEST_NODES_DATA))
}

var app = proxyquire('../app', {'./data/dataTransform': dataStub})

describe('the app', function() {
  it('returns the root node, with all of its children', function(done) {
    request(app)
      .get('/nodes')
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        expect(res.body).to.eql(TEST_NODES_DATA)
        done(err)
      })
  })
})

