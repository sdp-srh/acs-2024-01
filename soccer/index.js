/**
 * this module handles all http request to our soccer app
 * It returns the data as json
 */

// include libraries for microservices and file handling
const express = require('express')

const { Firestore } = require('@google-cloud/firestore')
const { readMatches, readTeams, readRankings, readStatus } = require('./db')

const fs = require('fs')
const path = require('path')
// library for reading the .env file
require('dotenv').config()


// start express app
const app = express()
const port = process.env.PORT || 3000
// include body parser for easier handling of json in the request
app.use(express.json())

 app.use(express.static(path.join(__dirname, 'public')))

// set the correct header information
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// options for the different endpoints
app.options('/api/match', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

app.options('/api/team', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

app.options('/api/addresult', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

// formatting of the responses
app.set('json spaces', 2);


app.options('/api/addresult', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

// formatting of the responses
app.set('json spaces', 2);

// will be replaced by db caching
// let teams = []
//let matches = []

// 
app.get('/api/', (req, res) => {
  res.send('<html><body><h1>ACS - Soccer App</h1></body></html>')
})

app.get('/api/info', (req, res) => {
  res.send('<html><body><h3>ACS - Soccer App</h3><p>Version 1.1</p></body></html>')
})
/**
 * team endpoints
 */

// gets all teams
/*
app.get('/team', (req, res) => {
  res.send(teams)
})
*/

// gets all teams
app.get('/api/team', async (req, res) => {
  const teams = await readTeams()
  res.send(teams)
})

app.get('/api/status', async (req, res) => {
  const status = await readStatus()
  res.send(status)
})


// find a team with an ID
app.get('/api/team/:id', (req, res) => {
  const requestId = req.params.id
  console.log(`Looking for Team with id: ${requestId}`)
  const teams = readTeams()
  const result = teams.find(team => team.id === requestId)
  res.send(result)
})


app.get('/api/ranking', async (req, res) => {
  const entries = await readRankings()
  res.send(entries)
})

/**
 * match endpoints
 */
/*
app.get('/match', (req,res) => {
  res.send(matches)
})
*/

app.get('/api/match', async (req,res) => {
  const matches = await readMatches()
  //const matches = await readMatches()
  res.send(matches)
})


// find a team with an ID
app.get('/api/match/:id', async (req, res) => {
  const requestId = req.params.id
  console.log(`Looking for Match with id: ${requestId}`)
  const matches = await readMatches()
  const result = matches.find(match => match.id === requestId)
  res.send(result)
})


/***
 * here we start with an example of user authentication
 */


/*
// creates a new match
app.post('/api/match', (req, res) => {
  const newMatch = req.body
  // TODO validation
  matches.push(newMatch)
  res.send(newMatch)
})

// updates a match with new values
app.patch('/api/match/:id', (req, res) => {
  const matchId = req.params.id
  const newValues = req.body
  let match = matches.find(m => m.id === matchId)
  match = {...match, ...newValues}
  res.send(match)
})


// updates a match with new values
app.put('/api/addresult/', (req, res) => {
  const result = req.body
  let match = matches.find(m => m.id === result.id)
  match.goals1 = result.goals1
  match.goals2 = result.goals2
  match.finished = true
  res.send(match)
})

// deletes a match with the id
app.delete('/api/match/:id', (req, res) => {
  const index = matches.findIndex(m => m.id === req.params.id)
  if (index >-1) {
    matches.splice(index,1)
    res.send(`Removed: ${req.params.id}`)
  }
})
*/

// finds matches based on the team names and the start data by string matching
app.get('/api/findmatches', async (req, res) => {
  const term = req.query.term
  const matches = await readMatches()
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
app.get('/api/findteams', async (req, res) => {
  const teams = await readTeams()
  const term = req.query.term
  const results = teams.filter(team => team.name.toLowerCase().includes(term.toLowerCase()) )
  res.send(results)
})




// initialize the firebase auhtentication logic
const admin = require('firebase-admin')
const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase-admin/auth')
const adminApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: process.env.PROJECT_ID
})
const firebaseConfig = {
  apiKey: process.env.AUTH_KEY,
  authDomain: process.env.AUTH_URL,
}
initializeApp(firebaseConfig)

// read the token from the request
const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const token = req.headers.authorization.split(' ')[1]
    return token
  }
  return ''
}

// verify the user based on the bearer token
const verifyUser = async (req, res, next) => {
  try {
    const idToken = getToken(req)
    req.token = await getAuth().verifyIdToken(idToken)
    console.log('idToken', req.token)
    // process the next steps
    console.log('verify', 'success')
    next()
  } catch (err) {
    res.status(401).json({ error: { code: '401', message: 'Not Authorized' } })
    console.log(err)
    console.log('verify', 'failed')
  }
}

// profile will be loaded only for logged in and verified users
app.get('/api/profile/', verifyUser, (req, res) => {
  // TODO should be loaded from a database
  const profile = {
    name: 'Paul',
    mail: 'paul.tanzer@live.de',
    location: 'Heidelberg'
  }
  res.send(profile)
})




/**
 * initializing app
 */
app.listen(port, () => {
  console.log(`Soccer app is starting at ${port}`)
  console.log('Soccer app running')
})

