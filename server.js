const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const config = require('./config')
const massive = require('massive')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')

const app = express()

app.use(bodyParser.json())

massive(config.connectionString).then( dbInstance => {
  app.set('db', dbInstance)
  dbInstance.setSchema().then(() => console.log("Tables reset")).catch(err => console.log(err))
})

passport.use(new Auth0Strategy({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    clientSecret: config.auth0.clientSecret,
    callbackURL: config.auth0.callbackURL
  },

  function (accessToken, refreshToken, extraParams, profile, done) {
    //put db calls here

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
  console.log('serializing', user)
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  console.log('deserializing', user)
  done(null, user)
})

app.get('/auth', passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0',
  {successRedirect: 'http://localhost:3000/'}))

app.get('/auth/me', function (req, res) {
  if (!req.user)
    return res.status(200).send({firstname: null});
  res.status(200).send(req.user);
})

app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

app.listen(config.port, console.log(`Listening on port ${config.port}...`))

