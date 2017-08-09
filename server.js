const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const config = require('./config')
const massive = require('massive')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const twilio = require('twilio')
const client = new twilio(config.twilio.accountSid, config.twilio.authToken)

const app = express()

app.use(bodyParser.json())

massive(config.connectionString).then(dbInstance => {
  app.set('db', dbInstance)
  dbInstance.setSchema().then(() => console.log("Tables reset")).catch(err => console.log(err))

  passport.use(new Auth0Strategy({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    clientSecret: config.auth0.clientSecret,
    callbackURL: config.auth0.callbackURL
  },

    function (accessToken, refreshToken, extraParams, profile, done) {
      //put db calls here
      dbInstance.addPerson([profile.id, profile._json.given_name, profile._json.family_name, profile._json.email, ""])


      done(null, profile)
    }));

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  app.get('/auth', passport.authenticate('auth0'))

  app.get('/auth/callback', passport.authenticate('auth0',
    { successRedirect: 'http://localhost:3000/' }))

  app.get('/auth/me', function (req, res) {
    if (!req.user)
      return res.status(200).send("");
                        console.log("user", req.user)
    res.status(200).send(req.user);
  })

  app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('http://localhost:3000/');
  })

  app.post('/api/flight', function (req, res) {
    console.log('realnice')
    dbInstance.addTrip([req.body.flightNumber, req.body.arrivalDate, req.body.currentUserID, true, true]).then((trip) => (res.status(200).send(trip)))
  })

  app.post('/api/location', function(req, res) {
    dbInstance.addDriver([req.body.urrcentUserID, req.body.latitude, req.body.longitude]).then((driver) => (res.status(200).send(driver)))
  })

  app.put('/api/notification-pref', function(req, res) {
    dbInstance.updateTrip([req.body.morningOfNotification, req.body.tripID]).then((trip) => (res.status(200).send(trip)))
  })

  app.post('/api/send-text', function(req, res) {
    console.log("Dexter's Laboratory", req.body.message, req.body.phoneNumber)

    client.messages.create({
      body: req.body.message,
      to: req.body.phoneNumber,
      from: config.twilio.twilioNumber
    }).then((message) => {
      console.log(message, "and", message.sid)
      res.status(200).send("We done it!")
    }).catch(err => console.log(err))
  })

})

app.listen(config.port, console.log(`Listening on port ${config.port}...`))

