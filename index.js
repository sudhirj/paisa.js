const SYMBOL = exports.SYMBOL = '₹'

const format = exports.format = (paise, precision) => {
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

exports.formatWithSymbol = (paise, precision) => {
  return [SYMBOL, format(paise, precision)].join('')
}

exports.words = (paise) => {
  console.log('WIP')
}

const parse = (paise) => {
  const littleEndian = paise.toString().split('').reverse()
  const rupeeParts = []
  const paisePart = []
  Array(2).fill(2).forEach(() => { paisePart.unshift(littleEndian.shift()) })
  const cycle = [3, 2, 2]
  let cycleIndex = 0
  while (littleEndian.length > 0) {
    const part = []
    const cycleSize = cycle[cycleIndex % cycle.length]
    Array(cycleSize).fill(cycleSize).forEach(() => { part.unshift(littleEndian.shift()) })
    rupeeParts.unshift(part.join(''))
    cycleIndex++
  }

  return {rupee: rupeeParts, paise: paisePart.join('')}
}
