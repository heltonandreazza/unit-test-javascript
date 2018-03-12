const orderTotal = require('./order-total')

const emptyFunction = () => {}

it('calls vatapi.com correctly', () => {
  let isFakeFetchCalled = false

  const fakeFetch = (url) => {
    expect(url).toBe('https://vatapi.com/v1/country-code-check?code=DE')
    isFakeFetchCalled = true
  }

  orderTotal(fakeFetch, {
    country: 'DE',
    items: [
      { 'name': 'Dragon candy', price: 2, quantity: 3 }
    ]
  }).then(result => {
    expect(isFakeFetchCalled).toBe(true)
  })
})

it('calls vatapi.com correctly if country code specified')

it('Quantity', () =>
  orderTotal(emptyFunction, {
    items: [
      { 'name': 'Dragon candy', price: 2, quantity: 3 }
    ]
  }).then(result => expect(result).toBe(6)))

it('Check fail: No quantity specified', () =>
  orderTotal(emptyFunction, {
    items: [
      { 'name': 'Dragon candy', price: 3 }
    ]
  }).then(result => expect(result).toBe(3)))

it('Check fail: Happy path (Example 1)', () =>
  orderTotal(emptyFunction, {
    items: [
      { name: 'Dragon food', price: 8 },
      { name: 'Dragon cage (small)', price: 800 },
    ]
  }).then(result => expect(result).toBe(808)))

it('Check fail: Happy path (Exaple 2)', () =>
  orderTotal(emptyFunction, {
    items: [
      { name: 'Dragon collar', price: 20 },
      { name: 'Dragon chew toy', price: 40 },
    ]
  }).then(result => expect(result).toBe(60)))