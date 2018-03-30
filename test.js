const paisa = require('./index')

const assert = require('assert')
const mocha = require('mocha')

mocha.describe('paisa', function () {
  mocha.it('should do simple formatting', function () {
    assert.equal('3.34', paisa.format(334))
    assert.equal('9,723.34', paisa.format(972334))
    assert.equal('792,83,83,393.34', paisa.format(792838339334))
    assert.equal('92,83,83,393.34', paisa.format(92838339334))
    assert.equal('2,83,83,393.34', paisa.format(2838339334))
    assert.equal('83,83,393.34', paisa.format(838339334))
    assert.equal('3,83,393.34', paisa.format(38339334))
    assert.equal('83,393.34', paisa.format(8339334))
    assert.equal('393.34', paisa.format(39334))
    assert.equal('0.03', paisa.format(3))
    assert.equal('0.50', paisa.format(50))
    assert.equal('0.00', paisa.format(0))
    assert.equal('393.3', paisa.format(39334, 1))
    assert.equal('393', paisa.format(39334, 0))
    assert.equal('0', paisa.format(0, 0))
  })

  mocha.it('should do formatting with symbol', function () {
    assert.equal('₹3.34', paisa.formatWithSymbol(334))
    assert.equal('₹9,723.34', paisa.formatWithSymbol(972334))
    assert.equal('₹2', paisa.formatWithSymbol(200, 0))
  })
})
