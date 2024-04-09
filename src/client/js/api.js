const apiGeonames = async (name) => {
  const url = `http://api.geonames.org/searchJSON?name=${name}&maxRows=1&user
name=kienht12 `
  return await fetch(url)
}
function apiCurrentWeather(lat, lon, key) {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&k
ey=${key}`
  return fetch(url)
}
function apiForecastWeather(lat, lon, key) {
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&days=5
&lat=${lat}&lon=${lon}`
  return fetch(url)
}

function apiSearchImages(key, keyword) {
  const url = `https://pixabay.com/api/?key=${key}&q=${keyword}&image_type=photo`
  return fetch(url)
}

const apiGetKeys = async () => {
  const url = `http://localhost:3000/apiKeys`
  return await fetch(url)
}
export {
  apiGeonames,
  apiCurrentWeather,
  apiForecastWeather,
  apiSearchImages,
  apiGetKeys,
}
