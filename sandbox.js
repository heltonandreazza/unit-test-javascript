// sandbox is for making sure we are creating the correct mock testing the real api
const fetch = require('node-fetch')
const orderTotal = require('./order-total')

const result = orderTotal(fetch, process, {
  country: 'DE',
  items: [
    { 'name': 'Dragon candy', price: 20, quantity: 2 }
  ]
})

// const result =
//   fetch('https://vatapi.com/v1/country-code-check?code=LU', {
//     headers: {
//       'apikey': '0800fc577294c34e0b28ad2839435945'
//     }
//   })
//   .then(response => response.json())
//   .then(data => data.rates.standard.value)

result