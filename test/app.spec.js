var expect = require('chai').expect,
    Browser = require('zombie')

const PORT = 54321

Browser.localhost('organising.s.wift.ly', PORT)

describe('the front-end @slow', () => {
  var app = require('../app')

  const browser = new Browser()
  before(done => { app.listen(PORT, done) })

  describe('the index', () => {
    before(() =>
      browser
        .visit('/')
        .then(() => browser.assert.success())
    )

    it('contains the top level elements', () => {
      browser.assert.text('h1', 'Haiiiiii ^____^')
    })
  })
})
