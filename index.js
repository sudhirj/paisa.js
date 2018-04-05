const SYMBOL = exports.SYMBOL = '₹'
const LABELS = ['', ' thousand', ' lakh', ' crore']

const format = exports.format = (paise, precision) => {
  if (precision === undefined) {
    precision = 2
  }
  const parts = parse(paise)
  const stringParts = []
  if (precision > 0) {
    stringParts.unshift(parts.paise.padStart(2, '0').slice(0, precision))
  }
  stringParts.unshift(parts.rupeeParts.join(',').padEnd(1, '0'))
  return stringParts.join('.')
}

exports.formatWithSymbol = (paise, precision) => {
  return [SYMBOL, format(paise, precision)].join('')
}

const partInWords = (part) => {
  
}

exports.words = (paise) => {
  const parsedParts = parse(paise)
  const rupeeTextParts = parsedParts.rupeeParts.reverse().reduce((previousValue, currentValue) => {
    previousValue.push([partInWords(currentValue), LABELS[currentValue.size]].join(''))
  }, [])

  const text = []
  if (rupeeTextParts.length) text.push([rupeeTextParts.reverse().join(', '), 'rupees'].join(' '))
  if (parsedParts.paise.length) text.push([partInWords(parsedParts.paise), 'paise'].join(' '))
  return text
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

  return {rupeeParts: rupeeParts, paise: paisePart.join('')}
}
