var expect = require('chai').expect,
    colors = require('colors'),
    readline = require('readline')

function makeVerySureTheTestsShouldBeRun(test, allowEver, skipPrompt, promptText, done) {
    if (!process.env.ORGSWIFT_ALLOW_DANGER) {
      test.skip()
    }

    if (!process.env.ORGSWIFT_SKIP_DANGER_WARNING) {
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question(`
          These tests will delete all data at ${NEO4j_HOST}.
          Type "continue" and press Enter to continue, otherwise the tests will be skipped.
          `.bold.underline.orange,
          answer => {
            if (answer.toUpperCase() === 'CONTINUE') {
              done()
            } else {
              console.warn('Did not receive continue confirmation. Skipping tests.'.yellow)
              test.skip()
            }
          })
    }
}

describe('the database @danger', () => {
  before(function(done) {
  })

  it('should not run unless danger is allowed', () => false)
})
