const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const massive = require('massive');
const app = express();

app.use(bodyParser.json());

massive(config.connectionString).then( dbInstance => {
  app.set('db', dbInstance)
  dbInstance.setSchema().then(() => console.log("Tables reset")).catch(err => console.log(err))
})



app.listen(config.port, console.log(`Listening on port ${config.port}...`));

