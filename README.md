# paisa.js

Having trouble figuring out where to put the commas in Indian money? Are you being lazy and defaulting to hundreds of thousands and millions instead of lakhs and crores? Default no more! Paisa.js is here to save you. 

Just do 
`yarn add paisa.js`
or, if you're still old school,
`npm install paisa.js --save`

```
const paisa = require('paisa.js')
// Let's format paise - if you have your numbers in Rupees, multiply by 100 to get the paise interger
paisa.format(12345) // "123.45"
paisa.format(12345678) // "1,23,456.78"
paisa.format(12345678987) // "12,34,56,789.87"
paisa.format(12345678987, 0) // "12,34,56,789"
paisa.format(10000) // "100"
paisa.format(10000,2) // "100.00"
paisa.formatWithSymbol(12345678) // "₹1,23,456.78"
paisa.formatWithSymbol(10000) // "₹100"
