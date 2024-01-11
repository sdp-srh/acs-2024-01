/**
 * this module handles all http request to our soccer app
 * It returns the data as json
 */

// include libraries for microservices and file handling
const express = require('express')


const fs = require('fs')
const path = require('path')


// start express app
const app = express()
const port = process.env.PORT || 3000
// include body parser for easier handling of json in the request
app.use(express.json())
// set the correct header information
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// options for the different endpoints
app.options('/match', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

app.options('/team', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

app.options('/addresult', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

// formatting of the responses
app.set('json spaces', 2);


app.options('/addresult', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

// formatting of the responses
app.set('json spaces', 2);

// data required on the server (currently used because there is no database)
let teams = []
let matches = []

// 
app.get('/', (req, res) => {
  res.send('<html><body><h1>ACS - Soccer App</h1></body></html>')
})

/**
 * team endpoints
 */

// gets all teams
app.get('/team', (req, res) => {
  res.send(teams)
})


// find a team with an ID
app.get('/team/:id', (req, res) => {
  const requestId = req.params.id
  console.log(`Looking for Team with id: ${requestId}`)
  const result = teams.find(team => team.id === requestId)
  res.send(result)
})


/**
 * match endpoints
 */
app.get('/match', (req,res) => {
  res.send(matches)
})


// find a team with an ID
app.get('/match/:id', (req, res) => {
  const requestId = req.params.id
  console.log(`Looking for Team with id: ${requestId}`)
  const result = matches.find(match => match.id === requestId)
  res.send(result)
})

// creates a new match
app.post('/match', (req, res) => {
  const newMatch = req.body
  // TODO validation
  matches.push(newMatch)
  res.send(newMatch)
})

// updates a match with new values
app.patch('/match/:id', (req, res) => {
  const matchId = req.params.id
  const newValues = req.body
  let match = matches.find(m => m.id === matchId)
  match = {...match, ...newValues}
  res.send(match)
})

// updates a match with new values
app.put('/addresult/', (req, res) => {
  const result = req.body
  let match = matches.find(m => m.id === result.id)
  match.goals1 = result.goals1
  match.goals2 = result.goals2
  match.finished = true
  res.send(match)
})

// deletes a match with the id
app.delete('/match/:id', (req, res) => {
  const index = matches.findIndex(m => m.id === req.params.id)
  if (index >-1) {
    matches.splice(index,1)
    res.send(`Removed: ${req.params.id}`)
  }
})

// finds matches based on the team names and the start data by string matching
app.get('/findmatches', (req, res) => {
  const term = req.query.term
  const results = matches.filter(match => {
    if (match.startDate.toLowerCase().includes(term.toLowerCase())) return true
    const name1 = teams.find(team => team.id = match.team1)
    if (name1.toLowerCase().includes(term.toLowerCase())) return true
    const name2 = teams.find(team => team.id = match.team2)
    if (name2.toLowerCase().includes(term.toLowerCase())) return true
    return false
  })
  res.send(results)
})


// finds teams based on the name (ignores upper and lower case)
app.get('/findteams', (req, res) => {
  const term = req.query.term
  const results = teams.filter(team => team.name.toLowerCase().includes(term.toLowerCase()) )
  res.send(results)
})

/**
 * initializing app
 */
app.listen(port, () => {
  console.log(`Soccer app is starting at ${port}`)
  loadTeams()
  loadMatches() 
  console.log('Soccer app running')
})


/**
 * helper functions (will be replaced by database in future) 
 * */ 
const loadTeams = () => {
  const filepath = path.join(__dirname, 'data', 'teams.json')
  const data = fs.readFileSync(filepath)
  teams = JSON.parse(data)
  console.log(`${teams.length} Teams loaded from ${filepath}`)
}

const loadMatches = () => {
  const filepath = path.join(__dirname, 'data', 'matches.json')
  const data = fs.readFileSync(filepath)
  matches = JSON.parse(data)
  console.log(`${matches.length} Matches loaded from ${filepath}`)
}