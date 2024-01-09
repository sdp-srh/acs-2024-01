const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Hello ACS Course!</h1>')
})

app.get('/greet/:name', (req, res) => {
  // call google tranlsation service

  res.send(`<h2>Hello ${req.params.name}!</h2>`)
})

app.get('translate/:text', (req, res) => {
   // call google tranlsation service

})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})