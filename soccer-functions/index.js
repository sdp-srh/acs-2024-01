const functions = require('@google-cloud/functions-framework');
const axios = require('axios')
// const { Firestore } = require('@google-cloud/firestore')

// TODO get from environment or db
const league = 'bl1'
const season = '2023'

functions.http('load-openliga-data', async (req, res) => {
  console.log('load openliga data called')
  const teamResponse = await axios.get(`https://www.openligadb.de/api/getavailableteams/${league}/${season}`)
  const teams = teamResponse.data
  console.log(`Loaded teams (${teams.length}) from openliga`)
  console.log(teams[0])

  const matchResponse = await  axios.get(`https://www.openligadb.de/api/getmatchdata/${league}/${season}`)
  const matches = matchResponse.data
  console.log(`Loaded matches (${matches.length}) from openliga`)	
  console.log(matches[0])

  let message = `SOCCER: Loaded matches (${matches.length}), teams (${teams.length})`
  res.send({status:'OK', message: message })


  /*
  const firestore = new Firestore()

  console.log('load team data called')
  const teamResponse = await axios.get(`https://www.openligadb.de/api/getavailableteams/${league}/${season}`)
  const teams = teamResponse.data
  const teamsCollection = await firestore.collection(`teams`)

  for (const team of teams) {
    await teamsCollection.doc(''+team.TeamId).set(team)
  }
  const matchResponse = await  axios.get(`https://www.openligadb.de/api/getmatchdata/${league}/${season}`)
  const matches = matchResponse.data
  const matchCollection = await firestore.collection(`matches`)
 
  for (const match of matches) {
    await matchCollection.doc(''+match.MatchID).set(match)
  }
  let message = `Loaded matches (${matches.length}), teams (${teams.length})`
  console.log(message)
  */
  
})