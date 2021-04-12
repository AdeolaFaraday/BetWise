const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiKey = require('./apiKey')
const request = require('request')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
}

let serverErrMsg = "Error might be due to your internet connection, or my server is down."

app.get('/api', (req, res) => {
  console.log('here');
  request(`https://apiv2.apifootball.com/?action=get_countries&APIkey=${apiKey.apiKey}`, {
    json: true
  }, (err, resp, body) => {
    if (err) {
      return res.status(400).json({
        error: serverErrMsg
      })
    }
    return res.status(200).json(body)
  })
})

app.post('/api/leagues', (req, res) => {
  let countryId = req.body.countryId
  request(`https://apiv2.apifootball.com/?action=get_leagues&country_id=${countryId}&APIkey=${apiKey.apiKey}`, {
    json: true
  }, (err, resp, body) => {
    if (err) {
      return res.status(400).json({
        error: serverErrMsg
      })
    }
    if (body.length > 1) {
      return res.status(400).json({
        error: "Please select country"
      })
    } else {
      return res.status(200).json(body)
    }
  })
})

app.post('/api/teams', (req, res) => {
  let leaguesId = req.body.leagueSelect
  request(`https://apiv2.apifootball.com/?action=get_teams&league_id=${leaguesId}&APIkey=${apiKey.apiKey} `, {
    json: true
  }, (err, resp, body) => {
    if (err) {
      return res.status(400).json({
        error: serverErrMsg
      })
    }
    if (body.error) {
      return res.status(400).json({
        error: "Please select league"
      })
    } else {
      return res.status(200).json(body)
    }
  })
})

app.post('/api/h2hresult', (req, res) => {
  let firstTeam = req.body.teamSelectA
  let secondTeam = req.body.teamSelectB
  request(`https://apiv2.apifootball.com/?action=get_H2H&firstTeam=${firstTeam}&secondTeam=${secondTeam}&APIkey=${apiKey.apiKey}`, {
    json: true
  }, (err, resp, body) => {
    if (err) {
      return res.status(400).json({
        error: serverErrMsg
      })
    }
    return res.status(200).json(body)
  })
})

let port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server is listen on port ${port}`)
})
