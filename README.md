# paisa.js

Having trouble figuring out where to put the commas in Indian money? Are you being lazy and defaulting to hundreds of thousands and millions instead of lakhs and crores? Default no more! Paisa.js is here to save you. 

Just do 
`yarn add paisa.js`
or, if you're still old school,
`npm install paisa.js --save`

```
const paisa = require('paisa.js')
// Format paise - if you have your money in Rupees, multiply by 100 to get the number of paise.
paisa.format(12345) // "123.45"
paisa.format(12345678) // "1,23,456.78"
paisa.format(12345678987) // "12,34,56,789.87"
paisa.format(10000) // "100"

// Use formatWithSymbol to get Paisa to add the official Rupee symbol for you
paisa.formatWithSymbol(12345678) // "₹1,23,456.78"
paisa.formatWithSymbol(10000) // "₹100"

// Pass an optional second parameter to force decimal precision to be set. 
paisa.format(12345678987, 0) // "12,34,56,789" 
paisa.format(10000,2) // "100.00"
paisa.formatWithSymbol(10000,2) // "₹100.00"

paisa.words(292) // 'two rupees, ninety two paise'
paisa.words(92348) // 'nine hundred and twenty three rupees, forty eight paise'
paisa.words(677519385) // 'sixty seven lakh, seventy five thousand, one hundred and ninety three rupees, eighty five paise'
paisa.words(8677519385) // 'eight crore, sixty seven lakh, seventy five thousand, one hundred and ninety three rupees, eighty five paise'
paisa.words(50000000) // 'five lakh rupees'
paisa.words(5000000000) // 'five crore rupees'
paisa.words(5420000000) // 'five crore, forty two lakh rupees'

```
