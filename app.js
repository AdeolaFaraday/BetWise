const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiKey = require('./apiKey')
const https = require('https');

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

if(process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
}

app.get('/api', (req, res, next) => {
  https.get(`https://apiv2.apifootball.com/?action=get_countries&APIkey=${apiKey.apiKey}`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // A chunk of data has been recieved.
    resp.on('end', () => {
      let jsonData = JSON.parse(data)
      if (jsonData) {
        res.status(200).json({
          country: jsonData
        })
      } else {
        res.status(400).json({
          error: 'Can not fetch teams please try again'
        })
      }
    });
  }).on('error', (err) => {
    next(new Error(err))
  })
})

app.post('/api/leagues', (req, res, next) => {
  let countryId = req.body.countryId
  https.get(`https://apiv2.apifootball.com/?action=get_leagues&country_id=${countryId}&APIkey=${apiKey.apiKey} `, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // A chunk of data has been recieved.
    resp.on('end', () => {
      let jsonData = JSON.parse(data)
      if (jsonData) {
        return res.status(200).json({
          leagues: jsonData
        })
      } else {
        return res.status(400).json({
          error: 'Can not fetch leagues please select country'
        })
      }
    });
  }).on('error', (err) => {
    next(new Error(err))
  })
})

app.post('/api/teams', (req, res, next) => {
  let leaguesId = req.body.leagueSelect
  https.get(`https://apiv2.apifootball.com/?action=get_teams&league_id=${leaguesId}&APIkey=${apiKey.apiKey} `, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
      let jsonData = JSON.parse(data)
      if (!jsonData.error) {
        return res.status(200).json({
          teams: jsonData
        })
      } else {
        return res.status(400).json({
          error: 'Can not fetch teams please select league'
        })
      }
    });
  }).on('error', (err) => {
    next(new Error(err))
  })
})

app.post('/api/h2hresult', (req, res, next) => {
  let firstTeam = req.body.teamSelectA
  let secondTeam = req.body.teamSelectB
  https.get(`https://apiv2.apifootball.com/?action=get_H2H&firstTeam=${firstTeam}&secondTeam=${secondTeam}&APIkey=${apiKey.apiKey}`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
      let jsonData = JSON.parse(data)
      if (jsonData.firstTeam_lastResults) {
        return res.status(200).json({
          results: jsonData
        })
      } else {
        return res.status(400).json({
          error: 'Can not fetch results please select teams'
        })
      }
    })
  }).on('error', (err) => {
    next(new Error(err))
  })
})

app.use((error, req, res, next) => {
  res.status(500).json({
    error: 'Error migth be due to your interner connection, or my server is down.'
  })
})

let PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App is listen  on port ${PORT}`)
})
