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
  app.use(express.static('../client/video-app/build'))
}


app.get('/api', (req, res) => {
  request(`https://apiv2.apifootball.com/?action=get_countries&APIkey=${apiKey.apiKey}`, {
    json: true
  }, (err, resp, body) => {
    if (err) {
      return res.status(400).json({
        error: "Error might be due to your internet connection, or my server is down."
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
        error: "Error might be due to your internet connection, or my server is down."
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
        error: "Error might be due to your internet connection, or my server is down."
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
        error: "Error might be due to your internet connection, or my server is down."
      })
    }
    return res.status(200).json(body)
  })
})

<<<<<<< HEAD

app.listen(8080, () => {
  console.log('App is listem on port 8080')
=======
let PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App is listen  on port ${PORT}`)
>>>>>>> 6b8a66ce736c9d6c9d541e1767f38f1cb4d27e9a
})
