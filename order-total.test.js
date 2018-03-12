const orderTotal = require('./order-total')

it('calls vatapi.com correctly', () => {
  let isFakeFetchCalled = false

  const fakeProcess = {
    env: {
      VAT_API_KEY: 'key123'
    }
  }

  const fakeFetch = (url, opts) => {
    // headers: {
    //   'apikey': '0800fc577294c34e0b28ad2839435945'
    // }
    expect(opts.headers.apikey).toBe('key123')
    expect(url).toBe('https://vatapi.com/v1/country-code-check?code=DE')
    isFakeFetchCalled = true

    return Promise.resolve({
      // .then(data => data.rates.standard.value) (./sandbox.js)
      json: () => Promise.resolve({
        rates: {
          standard: {
            value: 19
          }
        }
      })
    })
  }

  return orderTotal(fakeFetch, fakeProcess, {
    country: 'DE',
    items: [
      { 'name': 'Dragon candy', price: 20, quantity: 2 }
    ]
  }).then(result => {
    expect(result).toBe(20 * 2 * 1.19)
    expect(isFakeFetchCalled).toBe(true)
  })
})

it('Quantity', () =>
  orderTotal(null, null, {
    items: [
      { 'name': 'Dragon candy', price: 2, quantity: 3 }
    ]
  }).then(result => expect(result).toBe(6)))

it('Check fail: No quantity specified', () =>
  orderTotal(null, null, {
    items: [
      { 'name': 'Dragon candy', price: 3 }
    ]
  }).then(result => expect(result).toBe(3)))

it('Check fail: Happy path (Example 1)', () =>
  orderTotal(null, null, {
    items: [
      { name: 'Dragon food', price: 8 },
      { name: 'Dragon cage (small)', price: 800 },
    ]
  }).then(result => expect(result).toBe(808)))

it('Check fail: Happy path (Exaple 2)', () =>
  orderTotal(null, null, {
    items: [
      { name: 'Dragon collar', price: 20 },
      { name: 'Dragon chew toy', price: 40 },
    ]
  }).then(result => expect(result).toBe(60)))