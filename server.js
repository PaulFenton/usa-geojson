const express = require('express');
var fs = require('fs');
const app = express()
const PORT = 8080

//configure CORS for local development
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

//test route
app.get('/', (req, res) => res.send('Hello World!'));

//get the state GeoJson
app.get('/states', (req, res) => {
    console.log("Processing /states request.");
    var states = JSON.parse(fs.readFileSync('./data/states.json', 'utf8'));
    res.send(states);
});

//get the county GeoJson for a county based on state ID
app.get('/counties/:stateId', (req, res) => {

    console.log("Processing /counties request.");

    //read the counties data file
    var counties = JSON.parse(fs.readFileSync('./data/counties.json', 'utf8'));

    //filter the counties data file by state Id
    counties.features = counties.features.filter(el => el.properties.STATEFP == req.params.stateId);

    //send the filtered result
    res.send(counties);
});

//start the server
app.listen(PORT);
console.log(`App listening on port ${PORT}!`);