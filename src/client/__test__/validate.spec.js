import { validateLocation } from '../js/validate.js'

describe('Check blank input text function', () => {
  test('Check blank input text', () => {
    expect(validateLocation('Hello')).toEqual(0)
  })

  test('Check blank input text', () => {
    expect(validateLocation('')).toEqual(1)
  })
})
