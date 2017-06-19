var expect = require('chai').expect,
    proxyquire = require('proxyquire');


const TEST_DATA = require('./testData')

function fakePromise(f) {
  return {
    then: cb => f(cb)
  }
}

var dataStub = {
  retrieveEntries: () => fakePromise(cb => cb(TEST_DATA.allEntries.raw))
}

var dataTransform = proxyquire('../data/dataTransform', {'./dataAccess': dataStub})

describe('the data transform', function() {
  it('formats the full list of nodes as children of root', function() {
    expect(dataTransform.retrieveEntries()).to.eql(TEST_DATA.allEntries.formatted)
  })
})
