const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const path = require('path')

const config = require('./config')

// initialize express app
const app = express()

// Configure MongoDB with mongoose ORM
mongoose.connect(config.mongoUri, config.options)
  .then((conn) => conn)
  .catch((err) => console.log(err))

const db = mongoose.connection
db.once('open', () => {
  console.log('Connected to database successfully')
})

// Setting Express Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(compression())

// static files uploading
app.use('/public', express.static(path.join(__dirname, 'public')))

// Setting Express Router endpoints
// app.use()

// Loading html files
app.get('/', (req, res) => {
  res.send('Welcome To Avios Product')
})

// Express Error Handler

app.listen(config.port, (err) => {
  if (err) { console.log(err) }
  console.log(`App server running on port ${config.port}`)
})
