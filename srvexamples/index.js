
const express = require('express')
const path = require('path')

// translation API
const {Translate} = require('@google-cloud/translate').v2

// big query api
const { BigQuery } = require('@google-cloud/bigquery');

// use winston as logger
const winston = require('winston');
// Imports the Google Cloud client library for Winston
const { LoggingWinston } = require('@google-cloud/logging-winston');
const loggingWinston = new LoggingWinston();

// start express app with the port from the environment or 3000 for local development
const app = express()
const port = process.env.PORT || 3000

// initialize winston logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    // Add Cloud Logging
    loggingWinston,
  ],
});

// enable json parsing
app.use(express.json())

// enable express to act as webserver for files in folder "public"
app.use(express.static(path.join(__dirname, 'public')))

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


// big data query endpoint
app.get('/api/google-trends', async (req, res) => {
  const trends = await readTrends()
  logger.info(`Trends found : ${trends.length}`)
  console.log(trends)
  res.send({ amount: trends.length, results: trends})
})


// reads the news from the big query service

const readTrends = async () => {
  const bigquery = new BigQuery()
  
  const statement = `
      -- This query shows a list of the daily top Google Search terms.
      SELECT
        refresh_date AS Day,
        term AS Top_Term,
        rank,
      FROM \`bigquery-public-data.google_trends.top_terms\`
      WHERE
        rank = 1
            -- Choose only the top term each day.
        AND refresh_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 WEEK)
            -- Filter to the last 1 weeks.
      GROUP BY Day, Top_Term, rank
      ORDER BY Day DESC
        -- Show the days in reverse chronological order.  
  `
  // call the data with the query statement
  const [rows] = await bigquery.query({query: statement})
  return rows;
}

// test of logging
app.get('/test/loginfo', async (req, res) => {
  const msg = `Log Info: ${new Date().toISOString()}`
  logger.info(`${msg}`)
  res.send(`<h1>${msg}</h1>`)
})

app.get('/test/logerror', async (req, res) => {
  const msg = `Log Error: ${new Date().toISOString()}`
  logger.error(`${msg}`)
  res.send(`<h1>${msg}</h1>`)
})



app.listen(port, async () => {
  logger.info(`test service is running on ${port}`)
})

