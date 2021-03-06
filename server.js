const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./config');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const twilio = require('twilio');
const client = new twilio(config.twilio.accountSid, config.twilio.authToken);
const schedule = require('node-schedule');
const axios = require('axios');
const path = require('path');
const app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname + '/build'));

//Emailer client test

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(config.nodeMailer)

//end Emailer

massive(config.connectionString).then(dbInstance => {
  app.set('db', dbInstance)
  dbInstance
    .setSchema()
    .then(() => console.log("Tables reset"))
    .catch(err => console.log(err))
    passport.use(new Auth0Strategy({
      domain: config.auth0.domain,
      clientID: config.auth0.clientID,
      clientSecret: config.auth0.clientSecret,
      callbackURL: config.auth0.callbackURL
    }, function (accessToken, refreshToken, extraParams, profile, done) {
      //put db calls here
      dbInstance.addPerson([profile.id, profile._json.given_name, profile._json.family_name, profile._json.email, ""])

      done(null, profile)
    }));

  app.use(session({resave: true, saveUninitialized: true, secret: config.sessionSecret}))

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  app.get('/auth', passport.authenticate('auth0'))

  app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: 'https://roomind.me/'}))

  app.get('/auth/me', function (req, res) {
    if (!req.user)
      return res.status(200).json(false);
    console.log("user", req.user.displayName)
    res
      .status(200)
      .send(req.user);
  })

  app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('https://roomind.me/');
  })

  app.post('/api/flight', function (req, res) {
    if(req.body.isFinalData) {
      dbInstance.addDriver([req.body.currentUserID, req.body.userLatitude, req.body.userLongitude]).then(trip => console.log(trip))
      dbInstance.updatePerson([req.body.currentUserID, req.body.phoneNumber, req.body.email]).then(trip => console.log(trip))
    }

    dbInstance.addTrip([req.body.flightNumber, req.body.arrivalDate, req.body.currentUserID, true, true,
        req.body.airportName, req.body.arrivalTime, null])
      .then((trip) => res.status(200).send(trip))

  })

  app.get('/api/flight', function (req, res) {
    dbInstance.getTrip([req.body.userID]).then((trip) => res.status(200).send(trip))
  })

  app.post('/api/location', function (req, res) {
    dbInstance.addDriver([req.body.currentUserID, req.body.latitude, req.body.longitude])
      .then((driver) => (res.status(200).send(driver)))
  })

  app.put('/api/notification-pref', function (req, res) {
    dbInstance
      .updateTrip([req.body.morningOfNotification, req.body.tripID])
      .then((trip) => (res.status(200).send(trip)))
  })

  app.post('/api/send-text', function (req, res) {
    console.log('This will probably send a text.', req.body.googleURL)
    let sendTextLater = schedule.scheduleJob(req.body.date, function () {
      console.log('This should be sending a text.')

      client.messages.create({
        body: `Almost time to leave for the airport! Here is a Google Maps link if you need directions:
        ${req.body.googleURL}`,
        to: req.body.phoneNumber,
        from: config.twilio.twilioNumber})
        .then((message) => {res.status(200).send("We done it!")}).catch(err => console.log(err))
    })
  })

  app.get('/api/flightAPI/:letters/:nums/:year/:month/:day/:location', function (req, res) {
    Promise.all([
      axios.get(`https://api.flightstats.com/flex/schedules/rest/v1/json/flight/${req.params.letters}/${req.params.nums}/arriving/${req.params.year}/${req.params.month}/${req.params.day}?appId=${config.flightStats.appId}&appKey=${config.flightStats.key}`)
        .then(flight => {
          return flight.data
        })
    ]).then((info) => {
      axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${req.params.location}&destination=${info[0].appendix.airports[0].name}&key=${config.google}`)
        .then((directions) => {
          res.send({info: info, directions: directions.data, location: req.params.location})
        })
        .catch(err => { console.log("directions err", err)
        })
    }).catch(err => console.error("flight err", err))
  })

  app.get('/api/new-location/:location/:destination', function(req, res) {
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${req.params.location}&destination=${req.params.destination}&key=${config.google}`)
      .then((directions) => {
        console.log("directions", directions.data)
        res.status(200).send({directions: directions.data})
      })
      .catch(err => console.log("err", err))
  })

  app.post('/api/send-email', function (req, res) {
    console.log("This will probably send an email.", req.body.googleURL)

    let sendEmailLater = schedule.scheduleJob(req.body.date, function () {
      console.log("This should be sending an email!")
      let mailOptions = {
        from: 'ridemindr@gmail.com',
        to: req.body.email,
        subject: `Your RideMindr Reminder!`,
        text: `Almost time to leave for the airport! Here is a link to Google Maps if you need directions: ${req.body.googleURL}`,
        html: `<b>Almost time to leave for the airport!</b>
                <p>Here is a link to Google Maps if you need directions: <a href={req.body.googleURL}>${req.body.googleURL}<a/></p>`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('Email sent!', info.messageId, info.response)
      })
    })
  })
  
  app.get('*', (req, res) => {
      console.log(__dirname + '/build/index.html');
      res.sendFile(path.join(__dirname, '/build/index.html'))
    });

})

app.listen(config.port, console.log(`Listening on port ${config.port}...`))
