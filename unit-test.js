if (orderTotal({
    items: [
      { name: 'Dragon food', price: 8 },
      { name: 'Dragon cage (small)', price: 800 },
    ]
  }) !== 808) {
  throw new Error('Check fail: Happy path')
}