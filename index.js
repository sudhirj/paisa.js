const SYMBOL = exports.SYMBOL = '₹'

const format = exports.format = function (paise, precision) {
  if (precision === undefined) {
    precision = 2
  }
  const parts = parse(paise)
  const stringParts = []
  if (precision > 0) {
    stringParts.unshift(parts.paise.padStart(2, '0').slice(0, precision))
  }
  stringParts.unshift(parts.rupee.join(',').padEnd(1, '0'))
  return stringParts.join('.')
}

exports.formatWithSymbol = function (paise, precision) {
  return [SYMBOL, format(paise, precision)].join('')
}

exports.words = function (paise) {
  console.log('WIP')
}

const parse = function (paise) {
  const littleEndian = paise.toString().split('').reverse()
  const rupeeParts = []
  const paisePart = []
  Array(2).fill(2).forEach(function () { paisePart.unshift(littleEndian.shift()) })
  const cycle = [3, 2, 2]
  var cycleIndex = 0
  while (littleEndian.length > 0) {
    const part = []
    const cycleSize = cycle[cycleIndex % cycle.length]
    Array(cycleSize).fill(cycleSize).forEach(function () { part.unshift(littleEndian.shift()) })
    rupeeParts.unshift(part.join(''))
    cycleIndex++
  }

  return {rupee: rupeeParts, paise: paisePart.join('')}
}
