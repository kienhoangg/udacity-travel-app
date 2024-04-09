import './styles/style.scss'
import {
  apiCurrentWeather,
  apiForecastWeather,
  apiGeonames,
  apiSearchImages,
  apiGetKeys,
} from './js/api'
import { handleSubmit } from './js/app.js'
import { validateLocation } from './js/validate.js'
import dayjs from 'dayjs'
export {
  apiGeonames,
  apiCurrentWeather,
  apiForecastWeather,
  apiSearchImages,
  handleSubmit,
  validateLocation,
  apiGetKeys,
  dayjs,
}
