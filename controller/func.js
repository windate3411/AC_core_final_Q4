function ranNumbers(min, max) {
  let result = Math.floor(Math.random() * (max - min + 1)) + min
  return result
}

function genShortId(n) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let shortId = ''

  for (let i = 0; i < n; i++) {
    let index = ranNumbers(0, letters.length - 1)
    shortId += letters[index]
  }
  return shortId
}

module.exports = {
  genShortId
}