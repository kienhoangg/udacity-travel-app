const f = require('../checkApiKey')

describe('Test function check if any keys valid', () => {
  test('returns true if both of keys valid', () => {
    expect(f.isValidApiKey('pixaBayApiKey', 'weatherBitApiKey')).toBe(true)
  })
})

describe('Test function check if any keys valid', () => {
  test('returns false if pixaBayApiKey is blank', () => {
    expect(f.isValidApiKey('', 'weatherBitApiKey')).toBe(false)
  })
})
describe('Test function check if any keys valid', () => {
  test('returns false if weatherBitApiKey is blank', () => {
    expect(f.isValidApiKey('pixaBayApiKey', '')).toBe(false)
  })
})
