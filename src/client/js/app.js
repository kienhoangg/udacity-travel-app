window.onload = async function (e) {
  await handleApiKeys()
  if (localStorage.getItem('weather')) {
    const { cityName, data, images } = JSON.parse(
      localStorage.getItem('weather'),
    )
    if (cityName && data) {
      generateCard(cityName, data, images)
    }
  }
}
function handleSubmit(event) {
  event.preventDefault()
  const { weatherBitApiKey, pixaBayApiKey } = JSON.parse(
    localStorage.getItem('apiKeys'),
  )
  // check what text was put into the form field
  let formText = document.getElementById('txtLocation')
  let formDate = document.getElementById('dtpDate')
  console.log(formText, formDate)
  if (Client.validateLocation(formText.value) === 1) {
    alert('Input text is required')
    formText.innerHTML = ''
    return
  }

  handleGeonamesApi(formText.value).then((geonamesData) => {
    handleForecastWeatherApi(
      geonamesData.geonames[0].lat,
      geonamesData.geonames[0].lng,
      weatherBitApiKey,
    ).then((weatherBitData) => {
      const imgsInfo = []
      handleSearchImageByLocation(pixaBayApiKey, formText.value).then(
        (imgData) => {
          imgData.hits.map((item) => imgsInfo.push(item))
          const weatherInformation = {
            cityName: weatherBitData.city_name,
            images: imgsInfo,
            data: [...weatherBitData.data],
          }
          generateCard(
            weatherInformation.cityName,
            weatherInformation.data,
            weatherInformation.images,
          )
          localStorage.setItem('weather', JSON.stringify(weatherInformation))
        },
      )
    })
  })

  console.log('::: Form Submitted :::')
}

function generateCard(cityName, data, images) {
  let cardSection = document.getElementById('card-section')
  cardSection.innerHTML = ''
  data.forEach((item, i) => {
    let card = document.createElement('div')
    card.setAttribute('class', 'card')

    let cardTitle = document.createElement('div')
    cardTitle.setAttribute('class', 'card-title')
    cardTitle.setAttribute('id', 'cardTitle')

    let leftCardTitle = document.createElement('div')
    leftCardTitle.setAttribute('class', 'left-card-title')
    leftCardTitle.setAttribute('id', 'leftCardTitle')

    let img = document.createElement('img')
    img.setAttribute('src', images[i].webformatURL)
    img.setAttribute('width', '154')
    img.setAttribute('height', '154')
    img.setAttribute('alt', images[i].tags)

    let figCaption = document.createElement('figcaption')
    figCaption.setAttribute('class', 'img-caption')
    figCaption.innerText = images[i].tags.split(',')[0]

    let rightCardTitle = document.createElement('div')
    rightCardTitle.setAttribute('class', 'right-card-title')
    rightCardTitle.setAttribute('id', 'rightCardTitle')

    let title = document.createElement('div')
    title.setAttribute('class', 'title')
    title.innerHTML = `My trip to: ${cityName}`

    let moreInfo = document.createElement('div')
    moreInfo.setAttribute('class', 'title')
    moreInfo.innerHTML = `Departing: ${Client.dayjs(
      Date.parse(item.datetime),
    ).format('DD MMMM YYYY')}`

    let cardDetail = document.createElement('div')
    cardDetail.setAttribute('class', 'card-detail')

    let tempListInfo = document.createElement('ul')
    tempListInfo.setAttribute('id', 'temp-list-info')
    let liTemp = document.createElement('li')
    liTemp.innerHTML = `Temperature: ${item.temp}`
    let liMinMaxTemp = document.createElement('li')
    liMinMaxTemp.innerHTML = `Temperature from ${item.min_temp} to ${item.max_temp}`
    let liWeatherStatus = document.createElement('li')
    liWeatherStatus.innerHTML = `Weather: ${item.weather.description}`
    tempListInfo.appendChild(liTemp)
    tempListInfo.appendChild(liMinMaxTemp)
    tempListInfo.appendChild(liWeatherStatus)
    cardDetail.appendChild(tempListInfo)

    let cardButton = document.createElement('div')
    cardButton.setAttribute('class', 'card-button')

    let button = document.createElement('button')
    button.setAttribute('class', 'read-more')
    button.innerHTML = 'Read more >>'

    // Add tag to parent element
    leftCardTitle.appendChild(img)
    leftCardTitle.appendChild(figCaption)
    rightCardTitle.appendChild(title)
    rightCardTitle.appendChild(moreInfo)
    cardButton.appendChild(button)
    cardTitle.appendChild(leftCardTitle)
    cardTitle.appendChild(rightCardTitle)
    card.appendChild(cardTitle)
    card.appendChild(cardDetail)
    card.appendChild(cardButton)

    cardSection.appendChild(card)
  })
}

// Call api to get lat and lng coordinates of the location (Geonames API)
const handleGeonamesApi = async (formText) => {
  try {
    const res = await Client.apiGeonames(formText)
    return res.json()
  } catch (error) {
    console.log('error', error)
    // appropriately handle the error
  }
}

// Call Api to get weather information of the location (WeatherBit API)
const handleForecastWeatherApi = async (lat, lng, weatherBitApiKey) => {
  try {
    const res = await Client.apiForecastWeather(lat, lng, weatherBitApiKey)
    return res.json()
  } catch (error) {
    console.log('error', error)
    // appropriately handle the error
  }
}

//Call api to search image by location
const handleSearchImageByLocation = async (key, keyword) => {
  try {
    const res = await Client.apiSearchImages(key, keyword)
    return res.json()
  } catch (error) {
    console.log('error', error)
    // appropriately handle the error
  }
}

//Call api to get apiKeys of WeatherBit and PixaBay
const handleApiKeys = async () => {
  try {
    const res = await Client.apiGetKeys()
    res.json().then((apiKey) => {
      localStorage.setItem('apiKeys', JSON.stringify(apiKey))
    })
  } catch (error) {
    console.log('error', error)
    // appropriately handle the error
  }
}
export { handleSubmit, handleApiKeys }
