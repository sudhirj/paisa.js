exports.format = function (paise, precision) {
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

exports.formatWithSymbol = function (paise) {
  console.log('WIP')
}

exports.words = function (paise) {
  console.log('WIP')
}

const parse = function (paise) {
  const little_endian = paise.toString().split('').reverse()
  const rupee_parts = []
  const paise_part = []
  Array(2).fill(2).forEach(function () { paise_part.unshift(little_endian.shift()) })
  const cycle = [3, 2, 2]
  var cycleIndex = 0
  while (little_endian.length > 0) {
    const part = []
    const cycleSize = cycle[cycleIndex % cycle.length]
    Array(cycleSize).fill(cycleSize).forEach(function () { part.unshift(little_endian.shift()) })
    rupee_parts.unshift(part.join(''))
    cycleIndex++
  }

  return {rupee: rupee_parts, paise: paise_part.join('')}
}
