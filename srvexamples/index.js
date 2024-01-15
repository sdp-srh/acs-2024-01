
const express = require('express')
const path = require('path')

const {Translate} = require('@google-cloud/translate').v2

// start express app with the port from the environment or 3000 for local development
const app = express()
const port = process.env.PORT || 3000

// enable json parsing
app.use(express.json())

// enable express to act as webserver for files in folder "public"
app.use(express.static(path.join(__dirname, 'public')))
/*
app.get('/', (req, res) => {
  res.send('<h1>Welcome to our service</h1><h2>here we provide some examples</h2><p>Version 0.1</p>')
})
*/
app.get('/api/info', async (req, res) => {
  res.send('<h1>Welcome to our service (API)</h1><h2>here we provide some examples</h2><p>Version 0.1</p>')
})

// translation post endpoint for german to english
app.post('/api/de2en', async (req, res) => {
  const source = req.body.source
  const translate = new Translate()
  const options = {from: 'de', to: 'en'}
  const [translation] = await translate.translate(source, options)
  res.send({translation: translation})
})


//  translation post endpoint for english to german
app.post('/api/en2de', async (req, res) => {
  const source = req.body.source
  const translate = new Translate()
  const options = {from: 'en', to: 'de'}
  const [translation] = await translate.translate(source, options);
  res.send({translation: translation})
})

app.listen(port, async () => {
  console.log(`test service is running on ${port}`)
})

