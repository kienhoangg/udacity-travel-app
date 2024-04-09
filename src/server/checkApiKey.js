function isValidApiKey(pixaBayApiKey, weatherBitApiKey) {
  if (!pixaBayApiKey || !weatherBitApiKey) {
    return false
  }
  return true
}

module.exports = { isValidApiKey }
