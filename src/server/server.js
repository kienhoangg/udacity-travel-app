// Express to run server and routes
const express = require('express')
const dotenv = require('dotenv')
const f = require('./checkApiKey')
// Start up an instance of app
const app = express()
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
dotenv.config()
const port = 3000
const server = app.listen(port, listening)

function listening(req, res) {
  console.log('listening on port', port)
}

let projectData = {}
app.get('/all', function (req, res) {
  res.send(projectData)
})

app.post('/feelings', function (req, res) {
  projectData = { ...req.body }
  res.send(projectData)
})

app.get('/apiKeys', function (req, res) {
  const isValidApiKey = f.isValidApiKey(
    process.env.PIXABAY_API_KEY,
    process.env.WEATHER_BIT_API_KEY,
  )
  console.log(isValidApiKey)
  res.send({
    pixaBayApiKey: process.env.PIXABAY_API_KEY,
    weatherBitApiKey: process.env.WEATHER_BIT_API_KEY,
  })
})
