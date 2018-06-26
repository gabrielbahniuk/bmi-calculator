'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
let arrayData = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, function(){
    console.log('Listening on port 3000...');
});

app.get('/data', function(req, res) {
    res.json(arrayData);
});

app.post('/data', function(req, res) {
    const height = req.body.height;
    const weight = req.body.weight;
    const bmi = req.body.bmi;

    arrayData.push({height, weight, bmi});    
    res.json(arrayData);    
});

