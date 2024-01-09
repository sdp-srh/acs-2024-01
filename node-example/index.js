// initialize express app
const express = require('express')
const app = express()

// define port
const port = 3000

// use express.json() to parse json data
app.use(express.json())

// define the routes
app.get('/', (req, res) => {
  res.send('<h1>Hello ACS Course!</h1>')
})

// greet with the name
app.get('/greet/:name', (req, res) => {
  res.send(`<h2>Hello ${req.params.name}!</h2>`)
})

// here we could integrate translation
app.get('translate/:text', (req, res) => {
   // call google tranlsation service
})


app.get('/mail', (req, res) => {
  res.send('<h2>provide to, subject and text as POST</h2>')
})

// example to send an email
app.post('/mail', (req, res) => {
  const data = req.body;
  console.log(data.to);
  console.log(data.subject);
  console.log(data.text);
  // here we should send the logic to send the email
  res.send(`Email sent to ${data.to}`);
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})