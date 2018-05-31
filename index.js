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

const regulars = [
  {
    1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine'
  },
  {
    2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty', 6: 'sixty', 7: 'seventy', 8: 'eighty', 9: 'ninety'
  }
]

const exceptions = {
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen'
}

const partInWords = (part) => {
  if (parseInt(part) === 0) return
  const digits = part.split('')
  const words = []
  if (digits.length === 3) {
    words.push([regulars[0][digits.shift()], 'hundred'].join(' '))
  }
  if (exceptions[digits.join('')]) {
    words.push(exceptions[digits.join('')])
  } else {
    words.push(digits.reverse().reduce((memo, el, i) => {
      memo.unshift(regulars[i][el])
      return memo
    }, []).filter(w => w).join(' '))
  }
  return words.filter(w => w.trim().length).join(' and ')
}

exports.words = (paise) => {
  const parsedParts = parse(paise)
  const rupeeTextParts = parsedParts.rupeeParts.filter(w => w).reverse().reduce((previousValue, currentValue, i) => {
    if (parseInt(currentValue) > 0) previousValue.push([partInWords(currentValue), LABELS[i]].join(''))
    return previousValue
  }, [])

  const text = []
  if (rupeeTextParts.length) text.push([rupeeTextParts.reverse().filter(w => w).join(', '), 'rupees'].join(' '))
  if (parseInt(parsedParts.paise)) text.push([partInWords(parsedParts.paise), 'paise'].join(' '))
  return text.join(', ')
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
