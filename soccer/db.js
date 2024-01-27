const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore()

const readTeams = async () => {
	console.log('readTeams called')
	const snapshot = await firestore.collection('teams').get()
	const teams = snapshot.docs.map(doc => doc.data())
	return teams
}

const readMatches = async () => {
	console.log('matches called')
	const snapshot = await firestore.collection('matches').get()
	const matches = snapshot.docs.map(doc => doc.data())
	return matches
}

module.exports = { readTeams, readMatches }