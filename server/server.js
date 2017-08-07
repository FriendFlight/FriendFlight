const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();

app.use(bodyParser.json());

app.listen(3001, console.log("it works!"));
