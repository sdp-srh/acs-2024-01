// importing the libraries for cloud functions
const functions = require('@google-cloud/functions-framework');
const axios = require('axios')
const { Firestore } = require('@google-cloud/firestore')

// TODO get from environment or db
const league = 'bl1'
const season = '2023'


const loadTeamData = async (firestore) => {
  console.log('load team data called')
  const teamResponse = await axios.get(`https://www.openligadb.de/api/getavailableteams/${league}/${season}`)
  const teams = teamResponse.data
  const teamsCollection = await firestore.collection(`teams`)
  //console.log(teams[0])
  for (const team of teams) {
    await teamsCollection.doc(''+team.teamId).set(team)
  }
  console.log(`${teams.length} teams stored to firestore`) 
  return teams.length
}

const loadMatchData = async (firestore) => {
  console.log('load match data called')
  const matchResponse = await  axios.get(`https://www.openligadb.de/api/getmatchdata/${league}/${season}`)
  const matches = matchResponse.data
  const matchCollection = await firestore.collection(`matches`)
  //console.log(matches[0])
  for (const match of matches) {
    await matchCollection.doc(''+match.matchID).set(match)
  }
  console.log(`${matches.length} matches stored to firestore`) 
  return matches.length
}

const loadTableData = async (firestore) => {
  console.log('load team data called')
  const tableResponse = await axios.get(`https://www.openligadb.de/api/getbltable/${league}/${season}`)
  const entries = tableResponse.data
  const tableCollection = await firestore.collection(`ranking`)
  // console.log(entries[0])
  let count = 0
  for (const entry of entries) {
    await tableCollection.doc('rank_'+count).set(entry)
    count++
  }
  console.log(`${entries.length} rankings stored to firestore`) 
  return entries.length
}

const loadStatusData = async (firestore) => {
  const currentMatchDayResponse = await axios.get(`https://www.openligadb.de/api/getcurrentgroup/${league}`)
  const currentMatchDay = currentMatchDayResponse.data
  const lastUpdateResponse =await axios.get(`https://www.openligadb.de/api/getlastchangedate/${league}/${season}/${currentMatchDay.groupOrderID}`)
  const lastUpdate = lastUpdateResponse.data
  const openLigaStatus = await firestore.collection(`olstatus`)
  const data = {
    ...currentMatchDay,
    lastUpdate: lastUpdate
  }
  await openLigaStatus.doc('current').set(data)
  console.log(`openliga status stored to firestore`)
  return data
}

functions.http('load-openliga-data', async (req, res) => {
  const start = Date.now()
  console.log('load openliga data called')
  
  /*
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
  */

  /*
  const firestore = new Firestore()
  const teamsCount = await loadTeamData(firestore)
  const matchesCount = await loadMatchData(firestore)
  let message = `Loaded matches (${matchesCount}), teams (${teamsCount})`
  console.log(message)
  const end = Date.now()
  console.log(`Duration: ${end-start} ms`)
  res.send({status:'OK', message: message })
  */
  
  const firestore = new Firestore()
  const [teamsCount, matchesCount, rankingsCount, olStatus] = await Promise.all([loadTeamData(firestore), loadMatchData(firestore), loadTableData(firestore), loadStatusData(firestore)]);
  let message = `Loaded matches (${matchesCount}), teams (${teamsCount}), rankings (${rankingsCount}), lastUpate (${olStatus.lastUpdate}), currentMatchDay (${olStatus.groupOrderID})`
  console.log(message)
  const end = Date.now()
  console.log(`Duration: ${end-start} ms`)
  res.send({status:'OK', message: message })

  /* // additional example with then
      Promise.all([loadTeams(), loadMatches()])
        .then(([teams, matches]) => {
            console.log('Teams:', teams);
            console.log('Matches:', matches);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
  */
  
})